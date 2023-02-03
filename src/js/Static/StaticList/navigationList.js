import { BaseComponent, setList } from "../../utils.js";
import SelectFactory from "./FactorySelect.js";

export default class SettingsList extends BaseComponent {
  constructor(parent, tag, className, wrapper) {
    super(parent, tag, className);
    this.wrapper = wrapper;
    this.setList(this.wrapper);
  }

  setList(wrapper) {
    while (this.element.firstChild) {
      this.element.firstChild.remove();
    }
    const settings = JSON.parse(localStorage.getItem("RajiSettings"));
    if (wrapper.navigation.activeButton.name === "Display") {
      const blocks = settings.blocks;
      for (let key in blocks) {
        blocks[key] = new SelectFactory(this.element, "li", "settings-item", {
          type: "blocks",
          text: key,
          mode: blocks[key],
          sections: "off",
        });
      }
      return blocks;
    } else if (wrapper.navigation.activeButton.name === "Wallpaper") {
      const photoSourse = settings.PhotoSourse;
      const backgoround = photoSourse.map((el) => {
        if (Object.keys(el).includes("Tags")) {
          el = new SelectFactory(this.element, "li", "settings-item", {
            type: "PhotoSource",
            text: el.Source,
            mode: el.Mode,
            sections: "off",
          });
        } else {
          el = new SelectFactory(this.element, "li", "settings-item", {
            type: "PhotoSource",
            text: el.Source,
            mode: el.Mode,
            sections: "on",
          });
        }
      });
      return backgoround;
    }
  }
}
