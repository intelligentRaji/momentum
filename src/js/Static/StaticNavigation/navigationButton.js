import { baseComponent, createElem } from "../../utils.js";

export default class NavigationButton extends baseComponent {
  constructor(parent, tag, className, src, text) {
    super(parent, tag, className);
    this.img = createElem(
      "img",
      "settings-navigation-image",
      this.element,
      undefined,
      src
    );
    this.text = createElem("p", "settings-navigation-text", this.element);
    this.text.textContent = text;
  }
}
