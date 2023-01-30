import { createElem } from "../utils.js";

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
    this.element = createElem(tag, className, parent);
  }
}
