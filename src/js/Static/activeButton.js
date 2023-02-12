import { createElem } from "../utils.js";
import i18n from "i18next";

export default class activeButton {
  constructor(tag, className, parent) {
    this.element = createElem(tag, className, parent);
    this.element.id = "Settings";
    i18n.on("loaded", () => {
      this.element.textContent = i18n.t(this.element.id);
    });
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
