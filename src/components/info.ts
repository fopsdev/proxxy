import { OvlBaseElement } from "./baseElement"
import { html } from "lit-html"
import { startTrack, stopTrack } from "../tracker/tracker"

export class OvlInfo extends OvlBaseElement {
  delay = (ms: number) =>
    new Promise((res) =>
      setTimeout(() => {
        res()
      }, ms)
    )

  async getUI() {
    let res1 = this.track(() => {
      return this.state.app.val2 + "lala"
    })
    await this.delay(Math.floor(Math.random() * 5000))
    return this.track(() => {
      return html`Original:${this.state.app.val2} Modified: ${res1}`
    })
  }
}
