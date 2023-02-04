import { BaseComponent, createElem } from "../../utils.js";

export default class TagButton extends BaseComponent {
  constructor(parent, tag, className, options, parentClass) {
    console.log(parentClass);
    super(parent, tag, className);
    this.element.textContent = "#" + options.name;
    if (options.mode === "on") {
      this.element.classList.add("active");
    }
    this.element.addEventListener("click", () => {
      if (options.mode === "off") {
        parentClass.tagButtons.forEach((el) => {
          if (el.element.classList.contains("active")) {
            el.element.classList.remove("active");
          }
        });
        this.element.classList.add("active");
      }
    });
  }
}
