import { createElem } from "../utils.js";

export default class activeButton {
  constructor(tag, className, parent) {
    this.element = createElem(tag, className, parent, "Settings");
  }
}
