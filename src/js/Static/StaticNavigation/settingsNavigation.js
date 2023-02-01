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
    this.width = this.buttons.Display.element.clientWidth;
    this.element.style.width = this.buttons.Display.img.clientWidth + 15 + "px";
    this.element.addEventListener("mouseenter", () => {
      this.timeoutId = setTimeout(() => {
        this.navigationFullStyle();
      }, 500);
    });
    this.element.addEventListener("mouseleave", () => {
      this.navigationSmallStyle();
    });
    for (let item in this.buttons) {
      this.buttons[item].element.addEventListener("click", () => {
        this.navigationSmallStyle();
      });
    }
  }

  navigationFullStyle() {
    this.element.style.width = this.width + 10 + "px";
    this.element.classList.add("active");
  }

  navigationSmallStyle() {
    this.element.style.width = this.buttons.Display.img.clientWidth + 15 + "px";
    this.element.classList.remove("active");
    clearTimeout(this.timeoutId);
  }
}
