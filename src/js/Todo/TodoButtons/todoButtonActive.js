import { createElem } from "../../utils.js";
import i18n from "i18next";

export default class TodoButtonActive {
  constructor(parent) {
    this.element = createElem("button", "todo-active-button lng", parent);
    this.element.id = "Todolist";
    i18n.on("loaded", () => {
      this.element.textContent = i18n.t(this.element.id);
    });
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
