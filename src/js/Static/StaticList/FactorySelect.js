import { baseComponent, createElem, ToUpperCase } from "../../utils.js";

export default class SelectFactory extends baseComponent {
  constructor(parent, tag, className, options) {
    super(parent, tag, className);
    this.text = createElem("p", "settings-item-text", this.element);
    this.text.textContent = this.getNameOfSection(options.text);
    this.switch = createElem("button", "settings-item-switch", this.element);
    this.bg = createElem("div", "settings-item-switch-bg", this.switch);
    this.item = document.querySelector(`.${options.text}`);
    if (options.mode === "on") {
      this.switch.classList.add("on");
    }
    this.switch.addEventListener("click", () => {
      let settings = JSON.parse(localStorage.getItem("RajiSettings"));
      if (settings[options.type][options.text] === "off") {
        this.setModeOn(this.switch, settings, options.type, options.text);
      } else {
        this.setModeOff(this.switch, settings, options.type, options.text);
      }
      localStorage.setItem("RajiSettings", JSON.stringify(settings));
    });
  }

  setModeOn(el, settings, type, text) {
    settings[type][text] = "on";
    el.classList.add("on");
    if (type === "blocks") {
      this.item.style.transition = "all 0.3s ease 0s";
      this.item.style.visibility = "visible";
      this.item.classList.remove("invisible");
    }
  }

  setModeOff(el, settings, type, text) {
    settings[type][text] = "off";
    el.classList.remove("on");
    if (type === "blocks") {
      this.item.style.transition = "all 0.3s ease 0s";
      this.item.classList.add("invisible");
      setTimeout((this.item.style.visibility = "hidden"), 300);
    }
  }

  getNameOfSection(text) {
    return ToUpperCase(text.split("-")[0]);
  }

  hideSection() {
    this.item.style.visibility = "hidden";
  }
}
