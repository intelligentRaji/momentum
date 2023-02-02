import { baseComponent, createElem } from "../../utils.js";

export default class NavigationButton {
  constructor(parent, tag, className, src, text) {
    this.element = document.createElement(tag);
    this.element.className = className;
    parent.element.append(this.element);
    this.img = createElem(
      "img",
      "settings-navigation-image",
      this.element,
      undefined,
      src
    );
    this.text = createElem("p", "settings-navigation-text", this.element);
    this.text.textContent = text;
    this.element.addEventListener("click", () => {
      this.activeButton();
      if (parent.element.clientWidth <= 46) {
        parent.navigationSmallStyle();
      }
      parent.timeoutId = setTimeout(() => {
        parent.navigationFullStyle();
      }, 500);
    });
    this.parent = parent;
  }

  activeButton() {
    const text = this.text.textContent;
    const element = this.element;
    this.parent.activeButton.element.classList.remove("active");
    this.parent.activeButton = { name: text, element: element };
    this.element.classList.add("active");
  }
}
