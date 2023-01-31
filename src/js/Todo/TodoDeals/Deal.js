import { createElem } from "../utils.js";
import createDeal from "./createDeal.js";

export default function Deal(type, text, parent, status = "", date) {
  this.type = type;
  this.text = text;
  this.parent = parent;
  this.status = status;

  createDeal(this, type, text, status, date);
}
