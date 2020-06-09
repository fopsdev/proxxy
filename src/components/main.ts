import { OvlBaseElement } from "./baseElement";
import { html } from "lit-html";

export class OvlMain extends OvlBaseElement {
  addRow6() {
    console.log("hurray");
    this.state.portal.table.rowsToShow.push(6);
    this.state.app.val2 = new Date().getMilliseconds().toString();
    setTimeout(() => {
      this.state.portal.table.rowsToShow[2] = 100;
    }, 5000);
  }
  async getUI() {
    return this.track(() => {
      let info = html`
        <ovl-info></ovl-info>
      `;
      return html`
        ${this.state.app.val1}
        <div>
          <button @click=${() => this.addRow6()}>Add Row 6</button>
        </div>

        <br />
        ${info}
        <br />
        <ovl-table .table=${this.state.portal.table}></ovl-table>
        <br />
        <ovl-table2 .table=${this.state.portal.table}></ovl-table2>
      `;
    });
  }
}
