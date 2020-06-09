import { getActiveTracker, callbacks } from "./tracker"
export function createDeepProxy(target) {
  const preproxy = new WeakMap()
  let callbacksToCall = new Set()
  let requestAnimationFrameIdle = true
  function makeHandler(path) {
    return {
      get(target, key, receiver) {
        let value = target[key]
        let activeTracker = getActiveTracker()
        if (activeTracker) {
          if (
            typeof value !== "function" &&
            !(
              Array.isArray(target) &&
              "length;push;pop;splice;unshift;shift".indexOf(key) > -1
            ) &&
            key !== "toJSON"
          ) {
            activeTracker.add([...path, key].join("."))
          }
        }
        return Reflect.get(...arguments)
      },
      // traps the Object.keys(...)
      ownKeys(target) {
        let activeTracker = getActiveTracker()
        if (activeTracker) {
          let ownKeys = Reflect.ownKeys(target)
          ownKeys.map((m) => {
            activeTracker.add([...path, m].join("."))
          })
          return ownKeys
        }
      },
      // traps (in operator)
      has(target, key) {
        let activeTracker = getActiveTracker()
        if (activeTracker) {
          Reflect.ownKeys(target).map((m) => {
            activeTracker.add([...path, m].join("."))
          })
          return Reflect.has(...arguments)
        }
      },

      set(target, key, value, receiver) {
        if (typeof value === "object") {
          value = proxify(value, [...path, key])
        }
        target[key] = value
        let isArray = Array.isArray(target)
        if (!isArray) {
          checkForUpdate([...path, key].join("."))
        } else if (isArray && "length;".indexOf(key) === -1) {
          checkForUpdate([...path].join("."))
        }
        return true
      },

      deleteProperty(target, key) {
        if (Reflect.has(target, key)) {
          unproxy(target, key)
          let deleted = Reflect.deleteProperty(target, key)
          if (deleted && handler.deleteProperty) {
            checkForUpdate([...path, key].join("."))
          }
          return deleted
        }
        return false
      },
    }
  }

  function unproxy(obj, key) {
    if (preproxy.has(obj[key])) {
      // console.log('unproxy',key);
      obj[key] = preproxy.get(obj[key])
      preproxy.delete(obj[key])
    }

    for (let k of Object.keys(obj[key])) {
      if (typeof obj[key][k] === "object") {
        unproxy(obj[key], k)
      }
    }
  }

  function proxify(obj, path) {
    for (let key of Object.keys(obj)) {
      if (typeof obj[key] === "object") {
        obj[key] = proxify(obj[key], [...path, key])
      }
    }

    let p = new Proxy(obj, makeHandler(path))
    preproxy.set(p, obj)
    return p
  }

  function checkForUpdate(path) {
    callbacks.forEach((value, key) => {
      if (value.has(path)) {
        callbacksToCall.add(key)
        if (requestAnimationFrameIdle) {
          window.requestAnimationFrame(callCallbacks)
          requestAnimationFrameIdle = false
        }
        value.delete(path)
      }
    })
  }
  function callCallbacks() {
    // call onUpdate method of affected component
    if (callbacksToCall.size > 0) {
      callbacksToCall.forEach(async (k) => {
        await k.doRender()
      })
      callbacksToCall = new Set()
    }
    requestAnimationFrameIdle = true
  }
  return proxify(target, [])
}
