import { BaseComponent, createElem } from "../../utils.js";

export default class TagButton extends BaseComponent {
  static number = 0;
  constructor(parent, tag, className, options, position) {
    super(parent, tag, className);
    console.log(position);
    TagButton.number++;
    this.element.type = "radio";
    this.element.id = options.name + position;
    this.element.name = position;
    if ((options.mode = "on")) {
      this.element.setAttribute("checked", true);
    }
    this.label = createElem(
      "label",
      "settings-item-label",
      parent,
      options.name
    );
    this.label.setAttribute("for", options.name + position);
  }
}
