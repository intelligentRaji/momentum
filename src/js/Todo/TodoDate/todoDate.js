import {
  createElem,
  removeChilds,
  tommorowDate,
  trimDate,
  yesterdayDate,
} from "../utils.js";
import Arrow from "./TodoArrow.js";
import DateText from "./todoDateText.js";
import { getListFromLocalSotrage } from "../localStorage.js";

export default class PlansDate {
  futureDate = tommorowDate(new Date());

  constructor(tag, className, parent, input, list) {
    this.element = document.createElement(tag);
    this.element.classList.add(className);
    parent.prepend(this.element);
    this.prev = new Arrow("div", "todo-date-icon prev", this.element);
    this.prev.element.addEventListener("click", () => {
      removeChilds(list);
      this.minusDate(this.futureDate);
      getListFromLocalSotrage(
        trimDate(this.futureDate),
        input,
        list,
        this.futureDate
      );
    });
    this.text = new DateText("p", "todo-plan-text", this.element);
    this.setTextContent(this.futureDate);
    this.next = new Arrow("div", "todo-date-icon next", this.element);
    this.next.element.addEventListener("click", () => {
      removeChilds(list);
      this.plusDate(this.futureDate);
      getListFromLocalSotrage(
        trimDate(this.futureDate),
        input,
        list,
        this.futureDate
      );
    });
  }

  setTextContent(date) {
    this.text.element.textContent = `${date.getDate()} ${
      this.text.months[date.getMonth()]
    } ${date.getFullYear()}`;
  }

  plusDate(date) {
    this.futureDate = tommorowDate(date);
    this.setTextContent(this.futureDate);
  }

  minusDate(date) {
    const millisecondsInDay = 86400000;
    if (+date - +new Date() >= millisecondsInDay) {
      this.futureDate = yesterdayDate(date);
      this.setTextContent(this.futureDate);
    }
  }
}
