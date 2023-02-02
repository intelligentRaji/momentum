import { baseComponent } from "../../utils.js";
import SelectFactory from "./FactorySelect.js";

export default class SettingsList extends baseComponent {
  constructor(parent, tag, className) {
    super(parent, tag, className);
    this.setList();
  }

  setList() {
    while (parent.firstChild) {
      parent.firstChild.remove();
    }
    const settings = JSON.parse(localStorage.getItem("RajiSettings"));
    const blocks = settings.blocks;
    for (let key in blocks) {
      blocks[key] = new SelectFactory(this.element, "li", "settings-item", {
        type: "block",
        text: key,
        mode: blocks[key],
        sections: "off",
      });
    }
    return blocks;
  }
}
