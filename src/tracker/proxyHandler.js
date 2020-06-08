import { callbacks, activeCallbacks } from "./tracker"
export function createDeepProxy(target) {
  const preproxy = new WeakMap()
  let callbacksToCall = new Set()
  let requestAnimationFrameStarted = false
  function makeHandler(path) {
    return {
      get(target, key, receiver) {
        //console.log(key)
        let value = target[key]
        //console.log(value)
        let activeCbLength = activeCallbacks.length
        if (activeCbLength > 0) {
          if (
            typeof value !== "function" &&
            !(
              Array.isArray(target) &&
              "length;push;pop;splice;".indexOf(key) > -1
            ) &&
            key !== "toJSON"
          ) {
            let cb = activeCallbacks[activeCbLength - 1]
            callbacks.get(cb).add([...path, key].join("."))
          }
        }
        return value
      },
      // traps the Object.keys(...)
      ownKeys(target) {
        let activeCbLength = activeCallbacks.length
        if (activeCbLength > 0) {
          let cb = activeCallbacks[activeCbLength - 1]
          Object.keys(target).map((m) => {
            callbacks.get(cb).add([...path, m].join("."))
          })
          return Reflect.ownKeys(target)
        }
      },
      // traps "id" in coloumns  (in operator)
      has(target, key) {
        console.log("target")
        console.log(target)
        let activeCbLength = activeCallbacks.length
        if (activeCbLength > 0) {
          let cb = activeCallbacks[activeCbLength - 1]
          Object.keys(target).map((m) => {
            callbacks.get(cb).add([...path, m].join("."))
          })
          return key in target
        }
      },

      set(target, key, value, receiver) {
        if (typeof value === "object") {
          value = proxify(value, [...path, key])
        }
        target[key] = value
        if (!(Array.isArray(target) && "length;".indexOf(key) > -1)) {
          checkForUpdate([...path, key].join("."))
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
      //console.log(path)
      if (value.has(path)) {
        callbacksToCall.add(key)
        if (!requestAnimationFrameStarted) {
          window.requestAnimationFrame(callCallbacks)
          requestAnimationFrameStarted = true
        }
        value.delete(path)
      }
    })
  }
  function callCallbacks() {
    // call onUpdate method of affected component
    callbacksToCall.forEach(async (k) => {
      debugger
      await k.doRender()
    })
    callbacksToCall = new Set()
    window.requestAnimationFrame(callCallbacks)
  }
  return proxify(target, [])
}
