import { OvlBaseElement } from "./baseElement"
import { html } from "lit-html"
import { callbacks, stopTrack, startTrack } from "../tracker/tracker"

export class OvlRow extends OvlBaseElement {
  props: any
  row: any
  delay = (ms) =>
    new Promise((res) =>
      setTimeout(() => {
        res()
      }, ms)
    )
  async getUI() {
    let row = <{ currentKey: string; rowData: { [key: string]: {} } }>this.row

    let info = html`<ovl-info></ovl-info>`
    await this.delay(Math.floor(Math.random() * 2000))
    startTrack(this)
    let res = Object.keys(row.rowData).map((k) => {
      return html`<td>${row.rowData[k]}</td> `
    })
    stopTrack()
    return html`${res}
      <tr>
        ${info}
      </tr> `
  }
}
