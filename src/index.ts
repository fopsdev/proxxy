import { createDeepProxy } from "./tracker/proxyHandler"
import { OvlMain } from "./components/main"
import { OvlTable } from "./components/table"
import { OvlTable2 } from "./components/table2"
import { OvlRow } from "./components/rows"
import { OvlInfo } from "./components/info"
import { render, html } from "lit-html"
customElements.define("ovl-main", OvlMain)
customElements.define("ovl-table", OvlTable)
customElements.define("ovl-table2", OvlTable2)
customElements.define("ovl-row", OvlRow)
customElements.define("ovl-info", OvlInfo)

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
        6: { id: 1, col1: "Test1", col2: 11.1 },
        7: { id: 2, col1: "Test2", col2: 11.2 },
        8: { id: 3, col1: "Test3", col2: 11.3 },
        9: { id: 4, col1: "Test4", col2: 11.4 },
        10: { id: 5, col1: "Test5", col2: 11.5 },
        11: { id: 1, col1: "Test1", col2: 11.1 },
        12: { id: 2, col1: "Test2", col2: 11.2 },
        13: { id: 3, col1: "Test3", col2: 11.3 },
        14: { id: 4, col1: "Test4", col2: 11.4 },
        15: { id: 5, col1: "Test5", col2: 11.5 },
        16: { id: 1, col1: "Test1", col2: 11.1 },
        20: { id: 2, col1: "Test2", col2: 11.2 },
        30: { id: 3, col1: "Test3", col2: 11.3 },
        40: { id: 4, col1: "Test4", col2: 11.4 },
        50: { id: 5, col1: "Test5", col2: 11.5 },
        100: { id: 1, col1: "Test1", col2: 11.1 },
        200: { id: 2, col1: "Test2", col2: 11.2 },
        300: { id: 3, col1: "Test3", col2: 11.3 },
        400: { id: 4, col1: "Test4", col2: 11.4 },
        500: { id: 5, col1: "Test5", col2: 11.5 },
      },
      rowsToShow: [1, 10, 50, 500],
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
