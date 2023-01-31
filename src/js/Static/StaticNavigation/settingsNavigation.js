import { baseComponent } from "../../utils.js";
import NavigationButton from "./navigationButton.js";
import showurl from "../../../assets/svg/show.svg";
import languageurl from "../../../assets/svg/language.svg";
import wallpaperurl from "../../../assets/svg/wallpaper.svg";

export default class Navigation extends baseComponent {
  constructor(parent, tag, className) {
    super(parent, tag, className);
    this.urls = [showurl, languageurl, wallpaperurl];
    this.buttons = ["Display", "Language", "Wallpaper"].reduce((acc, sum) => {
      acc[sum] = new NavigationButton(
        this.element,
        "button",
        "settings-navigation-button",
        this.urls[["Display", "Language", "Wallpaper"].indexOf(sum)],
        sum
      );
      return acc;
    }, {});
  }
}
