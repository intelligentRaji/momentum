import { createElem } from "../../utils.js";
import i18n from "i18next";
import TodoButtonActive from "./todoButtonActive.js";

export default class SmallActiveButton extends TodoButtonActive {
  constructor(parent, className) {
    super(parent);
    this.element.className = className;
  }
}
