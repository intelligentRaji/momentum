import { createElem } from "../utils.js";
import activeButton from "./activeButton.js";
import Wrapper from "./StaticList/settingsWrapper.js";

export default class Settings {
  constructor(tag, className, parent) {
    this.element = createElem(tag, className, parent);
    this.activeButton = new activeButton(
      "button",
      "settings-active-button lng",
      this.element
    );
    this.wrapper = new Wrapper("div", "settings-wrapper", this.element);
  }
}
