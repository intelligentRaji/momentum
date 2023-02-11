import { createElem } from "../../utils.js";

export default class DateText {
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  constructor(tag, className, parent) {
    this.textWrapper = createElem("div", "plan-text-wrapper", parent);
    this.date = createElem("span", "todo-plan-text", this.textWrapper);
    this.element = createElem(tag, className, this.textWrapper);
    this.year = createElem("span", "todo-plan-text", this.textWrapper);
  }
}
