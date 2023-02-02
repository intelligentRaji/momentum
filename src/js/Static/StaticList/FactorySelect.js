import { baseComponent, createElem } from "../../utils.js";

export default class SelectFactory extends baseComponent {
  constructor(parent, tag, className, options) {
    super(parent, tag, className);
    this.container = createElem(
      "div",
      "settings-button-container",
      this.element
    );
    this.text = createElem(
      "p",
      "settings-button-text",
      this.container,
      options.text
    );
  }
}
