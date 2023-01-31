import { createElem } from "./utils.js";
import Deal from "./TodoDeals/Deal.js";

export class CreateInput {
  constructor(tag, className, parent) {
    const input = createElem(tag, className, parent);
    input.type = "text";
    input.placeholder = "New Todo";
    this.element = input;
  }

  InputCreateDeal(type, text, parent, status = "", date) {
    new Deal(type, text, parent, status, date);
    this.element.value = "";
  }
}
