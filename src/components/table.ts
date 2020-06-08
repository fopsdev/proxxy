import { OvlBaseElement } from "./baseElement"
import { html } from "lit-html"
import { state } from "../index"

export class OvlTable extends OvlBaseElement {
  props: any
  table: any
  async getUI() {
    let table = <typeof state.portal.table>this.table
    console.log(table)
    let columnHeaders

    columnHeaders = Object.keys(table.data[1]).map((k) => {
      return html`<th>${k}</th>`
    })

    // if ("id" in table.data[1]) {
    //   console.log("id is in header")
    // }

    //for (let key in table.data[1]) {
    //}

    return html`<table>
      ${columnHeaders}
    </table>`
  }
}
