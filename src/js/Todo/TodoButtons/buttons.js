import { createElem } from "../utils.js";

export default function createButtonsWrapper(parent) {
  const buttonsWrapper = createElem("div", "todo-btns", parent);

  return buttonsWrapper;
}
