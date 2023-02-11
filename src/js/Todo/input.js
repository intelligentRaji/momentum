import { createElem } from "../utils.js";
import Deal from "./TodoDeals/Deal.js";
import i18n from "i18next";

export class CreateInput {
  constructor(tag, className, parent) {
    const input = createElem(tag, className, parent);
    input.type = "text";
    input.id = "newTodo";
    i18n.on("loaded", () => {
      input.placeholder = i18n.t(input.id);
    });
    input.addEventListener("input", () => {
      input.value = input.value.substr(0, 33);
    });
    this.element = input;
  }

  InputCreateDeal(type, text, parent, status = "", date) {
    new Deal(type, text, parent, status, date);
    this.element.value = "";
  }
}
