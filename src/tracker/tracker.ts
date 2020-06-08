import { OvlBaseElement } from "../components/baseElement"

export let callbacks = new Map()

export let activeCallbacks: OvlBaseElement[] = []

export const startTrack = (cb: OvlBaseElement) => {
  callbacks.set(cb, new Set())
  activeCallbacks.push(cb)
}

export const stopTrack = () => {
  console.log(activeCallbacks.length)
  activeCallbacks.pop()
  console.log(activeCallbacks.length)
}

export const disposeTrack = (cb: OvlBaseElement) => {
  callbacks.delete(cb)
}

export const logTrackingList = () => {
  console.log("tracking list")
  console.dir(callbacks)
}
