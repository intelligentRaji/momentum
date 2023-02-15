import { BaseComponent, createElem } from "./utils.js";
import { hideSetction } from "./utils.js";

export class weatherButton extends BaseComponent {
  constructor(parent, tag, className, target) {
    super(parent, tag, className);
    this.flex = createElem("div", "weather-small-flex", this.element);
    this.image = createElem("i", "weather-small-image owf", this.flex);
    this.temperature = createElem("p", "weather-small-temperature", this.flex);
    this.city = createElem("p", "weather-small-city", this.element);
    this.element.addEventListener("click", () => {
      target.classList.remove("closed");
    });
    hideSetction(this.element);
  }
}
