import { createDeepProxy } from "./tracker/proxyHandler"
import { OvlMain } from "./components/main"
import { OvlTable } from "./components/table"
import { render, html } from "lit-html"
customElements.define("ovl-main", OvlMain)
customElements.define("ovl-table", OvlTable)

let state_1 = {
  app: {
    val1: "bar",
    val2: "baz",
  },
  portal: {
    table: {
      data: {
        1: { id: 1, col1: "Test1", col2: 11.1 },
        2: { id: 2, col1: "Test2", col2: 11.2 },
        3: { id: 3, col1: "Test3", col2: 11.3 },
        4: { id: 4, col1: "Test4", col2: 11.4 },
        5: { id: 5, col1: "Test5", col2: 11.5 },
      },
    },
  },
}

export const state: typeof state_1 = createDeepProxy(state_1)

let main = html`<ovl-main></ovl-main>`
render(main, <HTMLElement>document.getElementById("app"))

// // Comp1
// setTimeout(() => {
//   const onUpdate = () => {
//     console.log("Comp1 update called")
//   }
//   startTrack(onUpdate)
//   console.log("Comp1 is reading val1: " + proxy.val1)
//   stopTrack()
// }, 100)

// // Comp2
// setTimeout(() => {
//   const onUpdate = () => {
//     console.log("Comp2 update called")
//   }
//   startTrack(onUpdate)
//   console.log("Comp2 is reading val1: " + proxy.val1)
//   console.log("Comp2 is reading val2: " + proxy.val2)
//   stopTrack()

//   // simulate component remove
//   setTimeout(() => {
//     disposeTrack(onUpdate)
//   }, 1500)
// }, 200)

// setTimeout(() => {
//   // simulate state change

//   logTrackingList()
//   proxy.val2 = "foo2"
// }, 1000)

// setTimeout(() => {
//   // simulate state change
//   logTrackingList()
//   proxy.val2 = "foo3"
//   proxy.val1 = "bar2"
// }, 2000)
