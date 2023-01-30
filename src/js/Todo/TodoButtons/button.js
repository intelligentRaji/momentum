import { baseComponent, createElem } from "../utils.js";

export default class Buttons {
  constructor(tag, className, parent) {
    const buttons = ["Today", "Plans", "Inbox"].reduce((a, e) => {
      a[e] = createElem("button", "todo-btn", parent, e);
      return a;
    }, {});
    buttons.Today.classList.add("active");
    this.active = Object.keys(buttons)[0];
    this.buttons = buttons;
  }

  addActive(obj, key) {
    if (this.active) {
      obj[this.active].classList.remove("active");
    }
    obj[key].classList.add("active");
    this.active = key;
  }

  InputPlaceholder(input) {
    switch (this.active) {
      case "Today":
        input.placeholder = "New Todo";
        break;
      case "Plans":
        input.placeholder = "New Plan";
        break;
      case "Inbox":
        input.placeholder = "New Idea";
        break;
    }
  }

  showMode(deal, planStructure, Inbox) {
    switch (this.active) {
      case "Today":
        deal.style.display = "flex";
        planStructure.style.display = "none";
        Inbox.style.display = "none";
        break;
      case "Plans":
        deal.style.display = "none";
        planStructure.style.display = "flex";
        Inbox.style.display = "none";
        break;
      case "Inbox":
        deal.style.display = "none";
        planStructure.style.display = "none";
        Inbox.style.display = "flex";
        break;
    }
  }
}
