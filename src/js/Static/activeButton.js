import { createElem } from "../utils.js";

export default class activeButton {
  constructor(tag, className, parent) {
    this.element = createElem(tag, className, parent, "Settings");
    document.addEventListener("click", (e) => {
      const click = e.composedPath().includes(parent);
      if (!click) {
        parent.classList.add("closed");
      }
    });
    this.element.addEventListener("click", () => {
      parent.classList.toggle("closed");
    });
  }
}
