import { BaseComponent, createElem, ToUpperCase } from "../../utils.js";
import TagButton from "./TagButton.js";

export default class SelectFactory extends BaseComponent {
  constructor(parent, tag, className, options, parentClass) {
    super(parent, tag, className);
    if (typeof options.sections === "object") {
      this.switchWrapper = createElem(
        "div",
        "settings-item-wrapper",
        this.element
      );
      this.text = createElem("p", "settings-item-text", this.switchWrapper);
      this.switch = createElem(
        "button",
        "settings-item-switch",
        this.switchWrapper
      );
      this.tagsWrapper = createElem(
        "div",
        "settings-item-wrapper tags",
        this.element
      );
      this.tagButtons = options.sections.map((el) => {
        el = new TagButton(
          this.tagsWrapper,
          "input",
          "settings-item-input",
          el,
          options.text
        );
      });
    } else {
      this.text = createElem("p", "settings-item-text", this.element);
      this.switch = createElem("button", "settings-item-switch", this.element);
    }
    this.text.textContent = this.getNameOfSection(options.text);
    this.bg = createElem("div", "settings-item-switch-bg", this.switch);
    this.localStorageName = options.text;
    if (options.type === "blocks") {
      this.item = document.querySelector(`.${options.text}`);
    }
    if (options.mode === "on") {
      this.switch.classList.add("on");
      if (typeof options.sections === "object") {
        this.element.style.height = "100px";
      }
    }
    this.switch.addEventListener("click", () => {
      let settings = JSON.parse(localStorage.getItem("RajiSettings"));
      if (options.type === "blocks") {
        if (settings[options.type][options.text] === "off") {
          this.setModeOn(this.switch, settings, options.type, options.text);
        } else {
          this.setModeOff(this.switch, settings, options.type, options.text);
        }
      } else {
        if (settings[options.type][options.text].Mode === "off") {
          this.setModeOn(
            this.switch,
            settings,
            options.type,
            options.text,
            parentClass,
            options.sections
          );
        }
      }
      localStorage.setItem("RajiSettings", JSON.stringify(settings));
    });
  }

  setModeOn(
    el,
    settings,
    type,
    text,
    parentClass = undefined,
    sections = undefined
  ) {
    if (type === "blocks") {
      settings[type][text] = "on";
      el.classList.add("on");
      this.item.style.transition = "all 0.3s ease 0s";
      this.item.style.visibility = "visible";
      this.item.classList.remove("invisible");
    } else if (type === "PhotoSource") {
      this.setAutomaticlyOff(settings, type, parentClass, sections);
      settings[type][text].Mode = "on";
      el.classList.add("on");
      if (typeof sections === "object") {
        this.element.style.height = "100px";
      }
    }
  }

  setModeOff(el, settings, type, text) {
    settings[type][text] = "off";
    el.classList.remove("on");
    if (type === "blocks") {
      this.item.style.transition = "all 0.3s ease 0s";
      this.item.classList.add("invisible");
      setTimeout(() => {
        this.item.style.visibility = "hidden";
      }, 300);
    }
  }

  setAutomaticlyOff(settings, type, parentClass, options, sections) {
    for (let key in parentClass.listItems) {
      if (parentClass.listItems[key].switch.classList.contains("on")) {
        settings[type][parentClass.listItems[key].localStorageName].Mode =
          "off";
        parentClass.listItems[key].switch.classList.remove("on");
        this.closeElement(
          parentClass.listItems[key].element,
          options,
          sections
        );
      }
    }
  }

  closeElement(el) {
    el.style.height = "50px";
  }

  getNameOfSection(text) {
    return ToUpperCase(text.split("-")[0]);
  }

  hideSection() {
    this.item.style.visibility = "hidden";
  }
}
