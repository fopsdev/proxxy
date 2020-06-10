import { OvlBaseElement } from "./baseElement"
import { html } from "lit-html"
import { paths, callbacks } from "../tracker/tracker"

export class OvlMain extends OvlBaseElement {
  logPaths() {
    console.log("tracked paths:")
    console.log(paths)
  }

  logCallbacks() {
    console.log("tracked components:")
    console.log(callbacks)
  }

  addRow6() {
    //this.state.portal.table.rowsToShow = [1, 2, 3]

    /* DONT DO THAT, it will assign a new ref to array without beeing trapped by the proxy
    let arr = this.state.portal.table.rowsToShow
    arr = [1, 2, 3]
    */
    /* instead use a parent so the set proxy will be called and we need no workaround */

    let table = this.state.portal.table
    table.rowsToShow[1] = 500

    //this.state.app.val2 = new Date().getMilliseconds().toString()
    //setTimeout(() => {
    //this.state.portal.table.rowsToShow[2] = 100
    //}, 5000)
  }
  async getUI() {
    return this.track(() => {
      let info = html` <ovl-info></ovl-info> `
      return html`
        ${this.state.app.val1}

        <div>
          <button @click=${() => this.logPaths()}>Log Tracked Paths</button>
          <button @click=${() => this.logCallbacks()}>
            Log Tracked Components
          </button>
        </div>
        <br />
        <div>
          <button @click=${() => this.addRow6()}>Add Row 6</button>
        </div>

        <br />
        ${info}
        <br />
        <ovl-table .table=${this.state.portal.table}></ovl-table>
        <br />
        <ovl-table2 .table=${this.state.portal.table}></ovl-table2>
      `
    })
  }
}
