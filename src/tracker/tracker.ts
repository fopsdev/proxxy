import { OvlBaseElement } from "../components/baseElement"
export let callbacks = new Map()
export let paths = new Map()
export let activeCallbacks: OvlBaseElement[] = []

export const startTrack = (cb: OvlBaseElement) => {
  let cbToCheck = callbacks.get(cb)
  if (!cbToCheck) {
    callbacks.set(cb, new Set())
  }
  activeCallbacks.push(cb)
}

export const stopTrack = () => {
  activeCallbacks.pop()
}

export const disposeTrack = (cb: OvlBaseElement) => {
  // get all paths and remove from there as well
  callbacks.get(cb).forEach((path: string) => {
    let pathsCallbackSet = paths.get(path)
    pathsCallbackSet.delete(cb)
    if (pathsCallbackSet.size === 0) {
      paths.delete(path)
    }
  })
  callbacks.delete(cb)
}

export const logTrackingList = () => {
  console.log("tracking list")
  console.log(callbacks)
  console.log(paths)
}

export const isTracking = () => {
  return activeCallbacks.length > 0
}

export const addTrackedPath = (path: string) => {
  let cb = activeCallbacks[activeCallbacks.length - 1]
  callbacks.get(cb).add(path)
  if (!paths.has(path)) {
    paths.set(path, new Set())
  }
  paths.get(path).add(cb)
}
