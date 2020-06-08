import { OvlBaseElement } from "./baseElement"
import { html } from "lit-html"

export class OvlMain extends OvlBaseElement {
  async getUI() {
    return html`${this.state.app.val1}
      <br />
      <ovl-table .table=${this.state.portal.table}></ovl-table>`
  }
}
