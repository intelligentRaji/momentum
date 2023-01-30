import { createElem } from "../utils.js";
import arrowurl from "../../../assets/svg/arrow.svg";

export default class Arrow {
  constructor(tag, className, parent) {
    this.element = createElem(tag, className, parent);
    this.img = createElem(
      "img",
      "todo-date-icon-img",
      this.element,
      undefined,
      arrowurl
    );
    this.img.alt = "arrow";
  }
}
