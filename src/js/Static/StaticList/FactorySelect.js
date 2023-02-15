import { BaseComponent, createElem, ToUpperCase } from "../../utils.js";
import TagButton from "./TagButton.js";
import setBg from "../../setBg.js";
import i18n from "i18next";
import setWeather from "../../setWeather.js";

export default class SelectFactory extends BaseComponent {
  constructor(
    parent,
    tag,
    className,
    options,
    parentClass,
    wrapper = undefined
  ) {
    super(parent, tag, className);
    if (typeof options.sections === "object") {
      this.element.style.flexDirection = "column";
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
      this.tagButtons = options.sections.map((el, index) => {
        return new TagButton(
          this.tagsWrapper,
          "button",
          "settings-item-tag-button",
          el,
          this,
          options,
          index
        );
      });
    } else {
      this.text = createElem("p", "settings-item-text lng", this.element);
      this.switch = createElem("button", "settings-item-switch", this.element);
    }
    this.text.id = this.getNameOfSection(options.text);
    if (i18n.isInitialized) {
      this.text.textContent = i18n.t(this.text.id);
    } else {
      i18n.on("loaded", () => {
        this.text.textContent = i18n.t(this.text.id);
      });
    }
    this.bg = createElem("div", "settings-item-switch-bg", this.switch);
    this.localStorageName = options.text;
    if (options.type === "blocks") {
      this.item = document.querySelectorAll(`.${options.text}`);
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
      } else if (options.type === "PhotoSource") {
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
        setBg();
      } else if (options.type === "language") {
        if (settings[options.type][options.text] === "off") {
          this.setModeOn(
            this.switch,
            settings,
            options.type,
            options.text,
            parentClass,
            options.sections,
            wrapper
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
    sections = undefined,
    wrapper = undefined
  ) {
    if (type === "blocks") {
      settings[type][text] = "on";
      el.classList.add("on");
      for (let element of this.item) {
        element.style.transition = "all 0.3s ease 0s";
        element.style.visibility = "visible";
        element.classList.remove("invisible");
      }
    } else if (type === "PhotoSource") {
      this.setAutomaticlyOff(settings, type, parentClass, sections);
      settings[type][text].Mode = "on";
      el.classList.add("on");
      if (typeof sections === "object") {
        this.element.style.height = "100px";
      }
    } else if (type === "language") {
      this.setAutomaticlyOff(settings, type, parentClass, sections);
      settings[type][text] = "on";
      el.classList.add("on");
      const nodes = document.querySelectorAll(".lng");
      i18n.changeLanguage(text, () => {
        for (let element of nodes) {
          if (element.tagName === "INPUT") {
            element.placeholder = i18n.t(element.id);
          } else {
            element.textContent = i18n.t(element.id);
          }
        }
        wrapper.navigation.width = wrapper.navigation.element.scrollWidth;
      });
      setWeather();
    }
  }

  setModeOff(el, settings, type, text) {
    settings[type][text] = "off";
    el.classList.remove("on");
    if (type === "blocks") {
      for (let element of this.item) {
        console.log(this.item);
        element.style.transition = "all 0.3s ease 0s";
        element.classList.add("invisible");
        setTimeout(() => {
          element.style.visibility = "hidden";
        }, 300);
      }
    }
  }

  setAutomaticlyOff(settings, type, parentClass, options, sections) {
    for (let key in parentClass.listItems) {
      if (parentClass.listItems[key].switch.classList.contains("on")) {
        if (type === "PhotoSource") {
          settings[type][parentClass.listItems[key].localStorageName].Mode =
            "off";
        } else if (type === "language") {
          settings[type][parentClass.listItems[key].localStorageName] = "off";
        }
        parentClass.listItems[key].switch.classList.remove("on");
        if (type === "PhotoSource") {
          this.closeElement(
            parentClass.listItems[key].element,
            options,
            sections
          );
        }
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
