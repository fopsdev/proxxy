import { OvlBaseElement } from "./baseElement"
import { html } from "lit-html"
import { state } from "../index"

export class OvlTable extends OvlBaseElement {
  props: any
  table: any
  async getUI() {
    return this.track(() => {
      let table = <typeof state.portal.table>this.table
      let columnHeaders

      columnHeaders = Object.keys(table.data[1]).map((k) => {
        return html` <th>${k}</th> `
      })

      let rows

      rows = Object.keys(table.data).map((k) => {
        //@ts-ignore
        let rowData = table.data[k]
        console.log("pushing rowArray[2]:")
        console.log(table.rowsToShow[2])
        return html`
          <ovl-row
            style="display: table-row;"
            .props=${() => {
              return {
                currentKey: k,
                rowData,
                rowArray: table.rowsToShow,
              }
            }}
          ></ovl-row>
        `
      })

      return html`
        <b> All the rows </b>
        <table>
          ${columnHeaders} ${rows}
        </table>
      `
    })
  }
}
