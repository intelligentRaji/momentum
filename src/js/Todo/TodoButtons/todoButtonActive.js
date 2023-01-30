import { createElem } from "../utils.js";

export default class TodoButtonActive {
  constructor(parent) {
    this.element = createElem("button", "todo-active-button", parent, "Todo");
  }

  activeMode(todo, buttons) {
    todo.classList.contains("unactive");
    todo.classList.remove("unactive");
    for (let key in buttons) {
      buttons[key].style.display = "inline-block";
    }
    this.element.style.display = "none";
    document.addEventListener("click", (e) => {
      const click = e.composedPath().includes(todo);
      if (!click) {
        todo.classList.add("unactive");
        for (let key in buttons) {
          buttons[key].style.display = "none";
        }
        this.element.style.display = "inline-block";
        document.removeEventListener("click", e);
      }
    });
  }
}
