import { OvlBaseElement } from "./baseElement"
import { html } from "lit-html"
import { state } from "../index"

export class OvlTable extends OvlBaseElement {
  props: any
  table: any
  async getUI() {
    let table = <typeof state.portal.table>this.table
    let columnHeaders

    columnHeaders = Object.keys(table.data[1]).map((k) => {
      return html`<th>${k}</th>`
    })

    let rows

    rows = Object.keys(table.data).map((k) => {
      //@ts-ignore
      let rowData = table.data[k]
      return html`<tr>
        <ovl-row
          .row=${{
            currentKey: k,
            rowData,
            rowArray: this.state.portal.table.rowsToShow,
          }}
        ></ovl-row>
      </tr>`
    })

    return html`<b> All the rows </b>
      <table>
        ${columnHeaders} ${rows}
      </table>`
  }
}
