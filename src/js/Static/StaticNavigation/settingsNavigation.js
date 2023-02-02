import { baseComponent } from "../../utils.js";
import NavigationButton from "./navigationButton.js";
import showurl from "../../../assets/svg/show.svg";
import languageurl from "../../../assets/svg/language.svg";
import wallpaperurl from "../../../assets/svg/wallpaper.svg";

export default class Navigation extends baseComponent {
  constructor(parent, tag, className) {
    super(parent, tag, className);
    this.urls = [showurl, languageurl, wallpaperurl];
    this.buttonsNames = ["Display", "Language", "Wallpaper"];
    this.buttons = this.buttonsNames.reduce((acc, sum) => {
      acc[sum] = new NavigationButton(
        this,
        "button",
        "settings-navigation-button",
        this.urls[this.buttonsNames.indexOf(sum)],
        sum
      );
      return acc;
    }, {});
    this.buttons.Display.element.classList.add("active");
    this.activeButton = {
      name: this.buttonsNames[0],
      element: this.buttons.Display.element,
    };
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
