import { BaseComponent, createElem } from "../../utils.js";
import i18n from "i18next";

export default class Buttons {
  constructor(tag, className, parent) {
    const buttons = ["Today", "Plans", "Inbox"].reduce((a, e) => {
      a[e] = createElem("button", "todo-btn lng", parent);
      a[e].id = e;
      i18n.on("loaded", () => {
        a[e].textContent = i18n.t(e);
      });
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
        input.id = "newTodo";
        input.placeholder = i18n.t(input.id);
        break;
      case "Plans":
        input.id = "newPlan";
        input.placeholder = i18n.t(input.id);
        break;
      case "Inbox":
        input.id = "newIdea";
        input.placeholder = i18n.t(input.id);
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
