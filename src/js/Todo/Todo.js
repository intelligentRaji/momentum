import { baseComponent, createElem, trimDate, removeChilds } from "./utils.js";
import createButtonsWrapper from "./TodoButtons/buttons.js";
import { createDeals } from "./TodoDeals/Deals.js";
import { CreateInput } from "./input.js";
import Buttons from "./TodoButtons/button.js";
import TodoButtonActive from "./TodoButtons/todoButtonActive.js";
import {
  getListForFirstTime,
  getListFromLocalSotrage,
  getListOnDayChange,
} from "./localStorage.js";
import PlansDate from "./TodoDate/todoDate.js";

export default function Todo() {
  const todo = createElem("div", "todo unactive", document.body);
  const buttonsWrapper = createButtonsWrapper(todo);
  const todoActiveButton = new TodoButtonActive(buttonsWrapper);
  todoActiveButton.element.addEventListener("click", () => {
    todoActiveButton.activeMode(todo, buttons.buttons);
  });
  const deal = createDeals(todo);
  const plansStructure = createElem("div", "todo-plans-structure", todo);
  const Inbox = createElem("div", "todo-inbox spisok", todo);
  const input = new CreateInput("input", "todo-input", todo);
  input.element.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      if (buttons.active === "Today") {
        input.InputCreateDeal(buttons.active, input.element.value, deal);
      } else if (buttons.active === "Plans") {
        input.InputCreateDeal(
          buttons.active,
          input.element.value,
          plansList,
          undefined,
          plansDate.futureDate
        );
      } else if (buttons.active === "Inbox") {
        input.InputCreateDeal(buttons.active, input.element.value, Inbox);
      }
    }
  });
  const buttons = new Buttons("button", "todo-btn", buttonsWrapper);
  for (let key in buttons.buttons) {
    buttons.buttons[key].addEventListener("click", () => {
      buttons.addActive(buttons.buttons, key);
      buttons.InputPlaceholder(input.element);
      buttons.showMode(deal, plansStructure, Inbox);
    });
  }
  buttons.buttons.Plans.addEventListener("click", () => {
    removeChilds(plansList);
    getListFromLocalSotrage(
      trimDate(plansDate.futureDate),
      input,
      plansList,
      plansDate.futureDate
    );
  });
  buttons.buttons.Inbox.addEventListener("click", () => {
    removeChilds(Inbox);
    getListFromLocalSotrage("Inbox", input, Inbox);
  });
  const plansList = createElem("div", "todo-plans spisok", plansStructure);
  const plansDate = new PlansDate(
    "div",
    "todo-date",
    plansStructure,
    input,
    plansList
  );

  let curDate = trimDate(new Date());
  getListForFirstTime(curDate, input, deal);

  setInterval(() => {
    getListOnDayChange(input, deal);
    buttons.plansDate(new Date());
  }, 1000);
}
