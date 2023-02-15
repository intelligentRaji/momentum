import { BaseComponent } from "../../utils.js";
import NavigationButton from "./navigationButton.js";
import showurl from "../../../assets/svg/show.svg";
import languageurl from "../../../assets/svg/language.svg";
import wallpaperurl from "../../../assets/svg/wallpaper.svg";
import i18n from "i18next";

export default class Navigation extends BaseComponent {
  constructor(parent, tag, className, wrapper) {
    super(parent, tag, className);
    this.urls = [showurl, languageurl, wallpaperurl];
    this.buttonsNames = ["Display", "Language", "Wallpaper"];
    this.buttons = this.buttonsNames.reduce((acc, sum) => {
      acc[sum] = new NavigationButton(
        this,
        "button",
        "settings-navigation-button",
        this.urls[this.buttonsNames.indexOf(sum)],
        sum,
        wrapper
      );
      return acc;
    }, {});
    this.buttons.Display.element.classList.add("active");
    this.activeButton = {
      name: this.buttonsNames[0],
      element: this.buttons.Display.element,
    };
    if (i18n.isInitialized) {
      this.width = this.element.scrollWidth;
    } else {
      i18n.on("loaded", () => {
        this.width = this.element.scrollWidth;
      });
    }
    this.element.style.width = this.buttons.Display.img.clientWidth + 15 + "px";
    this.element.addEventListener("mouseenter", () => {
      this.timeoutId = setTimeout(() => {
        this.navigationFullStyle();
      }, 500);
    });
    this.element.addEventListener("mouseleave", () => {
      this.navigationSmallStyle();
    });
  }

  navigationFullStyle() {
    if (window.innerWidth > 500) {
      this.element.style.width = this.width + 10 + "px";
      this.element.classList.add("active");
    }
  }

  navigationSmallStyle() {
    this.element.style.width = this.buttons.Display.img.clientWidth + 15 + "px";
    this.element.classList.remove("active");
    clearTimeout(this.timeoutId);
  }
}
