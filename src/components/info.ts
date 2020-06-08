import { OvlBaseElement } from "./baseElement"
import { html } from "lit-html"
import { startTrack, stopTrack } from "../tracker/tracker"

export class OvlInfo extends OvlBaseElement {
  delay = (ms) =>
    new Promise((res) =>
      setTimeout(() => {
        res()
      }, ms)
    )

  async getUI() {
    await this.delay(Math.floor(Math.random() * 5000))
    startTrack(this)
    let res = html`${this.state.app.val2}`
    stopTrack()
    return res
  }
}
