import { OvlBaseElement } from "./baseElement"
import { html } from "lit-html"

export class OvlMain extends OvlBaseElement {
  addRow6() {
    this.state.portal.table.rowsToShow.push(6)
    setTimeout(() => {
      this.state.app.val2 = new Date().getMilliseconds().toString()
    }, 10000)
  }
  async getUI() {
    let info

    info = html`<ovl-info></ovl-info>`

    return html`${this.state.app.val1}
      <div>
        <button @click=${() => this.addRow6()}>Add Row 6</button>
      </div>

      <br />
      ${info}
      <br />
      <ovl-table .table=${this.state.portal.table}></ovl-table>
      <br />
      <ovl-table2 .table=${this.state.portal.table}></ovl-table2>`
  }
}
