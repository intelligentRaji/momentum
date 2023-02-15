import { BaseComponent } from "./utils.js";
import i18n from "i18next";
import { hideSetction } from "./utils.js";

export default class PlayerSmallButton extends BaseComponent {
  constructor(parent, tag, className, target) {
    super(parent, tag, className);
    this.element.id = "Player";
    if (i18n.isInitialized) {
      this.element.textContent = i18n.t(this.element.id);
    } else {
      i18n.on("loaded", () => {
        this.element.textContent = i18n.t(this.element.id);
      });
    }
    this.element.addEventListener("click", () => {
      target.classList.remove("closed");
    });
    hideSetction(this.element);
  }
}
