import { BaseComponent, setList } from "../../utils.js";
import SelectFactory from "./FactorySelect.js";

export default class SettingsList extends BaseComponent {
  constructor(parent, tag, className, wrapper) {
    super(parent, tag, className);
    this.wrapper = wrapper;
    this.listItems = this.setList(this.wrapper);
  }

  setList(wrapper) {
    while (this.element.firstChild) {
      this.element.firstChild.remove();
    }
    const settings = JSON.parse(localStorage.getItem("RajiSettings"));
    if (wrapper.navigation.activeButton.name === "Display") {
      const blocks = settings.blocks;
      for (let key in blocks) {
        blocks[key] = new SelectFactory(
          this.element,
          "li",
          "settings-item",
          {
            type: "blocks",
            text: key,
            mode: blocks[key],
            sections: "off",
          },
          this
        );
      }
      return blocks;
    } else if (wrapper.navigation.activeButton.name === "Wallpaper") {
      const photoSource = settings.PhotoSource;
      for (let key in photoSource) {
        if (photoSource[key].Tags) {
          photoSource[key] = new SelectFactory(
            this.element,
            "li",
            "settings-item",
            {
              type: "PhotoSource",
              text: key,
              mode: photoSource[key].Mode,
              sections: photoSource[key].Tags,
            },
            this
          );
        } else {
          photoSource[key] = new SelectFactory(
            this.element,
            "li",
            "settings-item",
            {
              type: "PhotoSource",
              text: key,
              mode: photoSource[key].Mode,
              sections: "off",
            },
            this
          );
        }
      }
      return photoSource;
    } else if (wrapper.navigation.activeButton.name === "Language") {
      const Languages = settings.language;
      for (let key in Languages) {
        Languages[key] = new SelectFactory(
          this.element,
          "li",
          "settings-item",
          {
            type: "language",
            text: key,
            mode: Languages[key],
            sections: "off",
          },
          this,
          wrapper
        );
      }
      return Languages;
    }
  }
}
