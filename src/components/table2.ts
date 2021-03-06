import { OvlBaseElement } from "./baseElement"
import { html } from "lit-html"
import { repeat } from "../myRepeat"
import { state } from "../index"

export class OvlTable2 extends OvlBaseElement {
  props: any
  table: any
  async getUI() {
    return this.track(() => {
      let table = this.table as typeof state.portal.table
      console.log("array at this stage:")
      console.log(table.rowsToShow)
      let columnHeaders
      columnHeaders = Object.keys(table.data[1]).map((k) => {
        return html` <th>${k}</th> `
      })

      let rows = repeat(
        table.rowsToShow,
        (k: string) => {
          return k
        },
        (k: string) => {
          //@ts-ignore
          let rowData = table.data[k]
          return html`
            <ovl-row
              style="display: table-row;"
              .props=${() => {
                return { currentKey: k, rowData, rowArray: table.rowsToShow }
              }}
            ></ovl-row>
          `
        },
        this
      )
      return html`
        <b> Rows from RowsToShow-Array </b>
        <table>
          ${columnHeaders} ${rows}
        </table>
      `
    })
  }
}
