import { OvlBaseElement } from "./baseElement";
import { html } from "lit-html";
import { state } from "../index";

export class OvlTable2 extends OvlBaseElement {
  props: any;
  table: any;
  async getUI() {
    return this.track(() => {
      let table = this.table as typeof state.portal.table;
      let columnHeaders;
      columnHeaders = Object.keys(table.data[1]).map(k => {
        return html`
          <th>${k}</th>
        `;
      });

      let rows;
      rows = table.rowsToShow.map(k => {
        //@ts-ignore
        let rowData = table.data[k];
        return html`
          <ovl-row
            style="display: table-row;"
            .row=${{ currentKey: k, rowData, rowArray: table.rowsToShow }}
          ></ovl-row>
        `;
      });
      return html`
        <b> Rows from RowsToShow-Array </b>
        <table>
          ${columnHeaders} ${rows}
        </table>
      `;
    });
  }
}
