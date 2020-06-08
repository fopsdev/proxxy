import { OvlBaseElement } from "../components/baseElement"

export const callbacks = new Map()

export const activeCallbacks: OvlBaseElement[] = []

export const startTrack = (cb: OvlBaseElement) => {
  callbacks.set(cb, new Set())
  activeCallbacks.push(cb)
}

export const stopTrack = () => {
  activeCallbacks.pop()
}

export const disposeTrack = (cb: OvlBaseElement) => {
  callbacks.delete(cb)
}

export const logTrackingList = () => {
  console.log("tracking list")
  console.dir(callbacks)
}
