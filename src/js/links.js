import { BaseComponent, createElem, hideSetction } from "./utils.js";
import image from "../assets/svg/rss.svg";

export default class Links extends BaseComponent {
  constructor(parent, tag, className) {
    super(parent, tag, className);
    hideSetction(this.element);
    this.gitHub = createElem(
      "a",
      "links-github links-link",
      this.element,
      "@intelligentRaji"
    );
    this.gitHub.href = "https://github.com/intelligentRaji";
    this.gitHub.target = "_blank";
    this.school = createElem("a", "links-school links-link", this.element);
    this.school.href = "https://rs.school/";
    this.school.target = "_blank";
    this.img = createElem("img", "links-school-img", this.school);
    this.img.src = image;
    this.year = createElem("p", "links-year", this.element, "2023");
  }
}
