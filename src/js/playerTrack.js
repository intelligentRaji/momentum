import { BaseComponent, createElem } from "./utils.js";

export default class classTrack extends BaseComponent {
  constructor(parent, tag, className, textContent) {
    super(parent, tag, className);
    this.button = createElem("button", "play-item-button", this.element);
    this.text = createElem(
      "p",
      "play-item-text active",
      this.element,
      textContent
    );
  }
}
