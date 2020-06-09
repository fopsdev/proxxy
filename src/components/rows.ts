import { OvlBaseElement } from "./baseElement"
import { html } from "lit-html"

export class OvlRow extends OvlBaseElement {
  props: any
  row: any
  delay = (ms: number) =>
    new Promise((res) =>
      setTimeout(() => {
        res()
      }, ms)
    )
  async getUI() {
    let row = this.row as {
      currentKey: string
      rowData: { [key: string]: {} }
      rowArray: number[]
    }

    let chk
    let res1 = this.track(() => {
      let info = html` <ovl-info></ovl-info> `
      chk = row.rowArray[2]
      return info
    })
    await this.delay(Math.floor(Math.random() * 2000))
    let res = this.track(() => {
      return Object.keys(row.rowData).map((k) => {
        return html` <td>${row.rowData[k]}</td> `
      })
    })
    return html`
      ${res}
      <tr>
        ${res1} ${chk}
      </tr>
    `
  }
}
