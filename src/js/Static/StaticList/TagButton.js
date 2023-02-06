import { BaseComponent, createElem } from "../../utils.js";

export default class TagButton extends BaseComponent {
  constructor(
    parent,
    tag,
    className,
    options,
    parentClass,
    parentOptions,
    index
  ) {
    super(parent, tag, className);
    this.element.textContent = "#" + options.name;
    if (options.mode === "on") {
      this.element.classList.add("active");
    }
    this.element.addEventListener("click", () => {
      const settings = JSON.parse(localStorage.getItem("RajiSettings"));
      if (
        (settings[parentOptions.type][parentOptions.text].Tags[index].mode =
          "off")
      ) {
        parentClass.tagButtons.forEach((el) => {
          if (el.element.classList.contains("active")) {
            el.element.classList.remove("active");
            settings[parentOptions.type][parentOptions.text].Tags.forEach(
              (el) => {
                el.mode = "off";
              }
            );
          }
        });
        this.element.classList.add("active");
        settings[parentOptions.type][parentOptions.text].Tags[index].mode =
          "on";
      }
      localStorage.setItem("RajiSettings", JSON.stringify(settings));
    });
  }
}
