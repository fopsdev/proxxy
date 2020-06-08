import { state } from "../index"
import {
  startTrack,
  stopTrack,
  disposeTrack,
  logTrackingList,
} from "../tracker/tracker"
import { render, TemplateResult } from "lit-html"

export class OvlBaseElement extends HTMLElement {
  state: typeof state
  name: string
  _id: number = 0
  static _counter: number = 0

  async getUI(): Promise<TemplateResult[] | TemplateResult | undefined> {
    return undefined
  }
  init() {
    // use it for getting data from parent, ...
  }

  constructor() {
    super()
    this._id = ++OvlBaseElement._counter
    this.name = this.localName + this._id.toString()
    this.state = state
  }

  async doRender() {
    startTrack(this)
    let res = await this.getUI()
    render(res, this)
    if (res instanceof Promise) {
      // res.then((t) => {
      startTrack(this)
      // })
    } else {
      stopTrack()
    }
    logTrackingList()
  }

  connectedCallback() {
    startTrack(this)
    this.init()
    stopTrack()
    this.doRender()
  }

  disconnectedCallback() {
    disposeTrack(this)
  }
}
