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

  track(fn: () => any) {
    startTrack(this)
    let res = fn()
    stopTrack()
    return res
  }

  constructor() {
    super()
    this._id = ++OvlBaseElement._counter
    this.name = this.localName + this._id.toString()
    this.state = state
  }

  async doRender() {
    let res = await this.getUI()
    render(res, this)
  }

  connectedCallback() {
    this.init()
    this.doRender()
  }

  disconnectedCallback() {
    disposeTrack(this)
  }
}
