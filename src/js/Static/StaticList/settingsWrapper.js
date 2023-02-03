import { createElem } from "../../utils.js";
import Navigation from "../StaticNavigation/settingsNavigation.js";
import SettingsList from "./navigationList.js";

export default class Wrapper {
  constructor(tag, className, parent) {
    this.element = createElem(tag, className, parent);
    this.navigation = new Navigation(
      this.element,
      "div",
      "settings-navigation",
      this
    );
    this.list = new SettingsList(this.element, "ul", "settings-list", this);
  }
}
