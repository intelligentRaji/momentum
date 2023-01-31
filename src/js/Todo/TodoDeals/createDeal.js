import checkmark from "../../../assets/svg/checkmark.svg";
import cross from "../../../assets/svg/cross.svg";
import trashurl from "../../../assets/svg/trash.svg";
import moveToToday from "../../../assets/svg/move-to-today.svg";
import { createElem, trimDate } from "../utils.js";
import {
  createLocalStorage,
  deleteLocalStorageItem,
  getLocalStorageItem,
} from "../localStorage.js";

export default function createDeal(
  obj,
  type,
  text,
  status = "",
  date = new Date()
) {
  let curDate = trimDate(date);
  if (type === "Today") {
    obj.deal = createElem(
      "li",
      "todo-item",
      document.querySelector(".todo-deals")
    );
  } else if (type === "Plans") {
    obj.deal = createElem(
      "li",
      "todo-item",
      document.querySelector(".todo-plans")
    );
  } else if (type === "Inbox") {
    obj.deal = createElem(
      "li",
      "todo-item",
      document.querySelector(".todo-inbox")
    );
  }

  if (type === "Today") {
    obj.complete = createElem("div", "todo-complete", obj.deal);
    obj.completeImg = createElem(
      "img",
      "todo-complete-img",
      obj.complete,
      undefined,
      checkmark
    );
    obj.complete.addEventListener("click", () => {
      obj.deal.remove();
      deleteLocalStorageItem(curDate, text);
      if (obj.status === "completed") {
        createDeal(obj, type, text, "");
      } else {
        createDeal(obj, type, text, "completed");
      }
    });
  }

  if (type === "Inbox") {
    obj.move = createElem("div", "todo-move", obj.deal);
    obj.moveImg = createElem(
      "img",
      "todo-move-img",
      obj.move,
      undefined,
      moveToToday
    );
    obj.move.addEventListener("click", () => {
      obj.deal.remove();
      const item = getLocalStorageItem("Inbox", text);
      deleteLocalStorageItem("Inbox", text);
      createDeal(obj, "Today", item.text, "");
    });
  }

  const textDeal = createElem("p", "todo-item-text", obj.deal, text);
  obj.trash = createElem("div", "todo-trash", obj.deal);
  obj.trash.addEventListener("click", () => {
    obj.deal.remove();
    if (type === "Inbox") {
      deleteLocalStorageItem("Inbox", text);
    } else {
      deleteLocalStorageItem(curDate, text);
    }
  });

  obj.status = status;

  if (type === "Today") {
    if (obj.status === "completed") {
      obj.deal.classList.add("completed");
      obj.completeImg.src = cross;
    } else {
      obj.deal.classList.remove("completed");
      obj.completeImg.src = checkmark;
    }
  }

  const trashImg = createElem(
    "img",
    "todo-trash-img",
    obj.trash,
    undefined,
    trashurl
  );

  let item = {
    type: type,
    text: text,
    status: status,
  };

  if (type === "Inbox") {
    createLocalStorage("Inbox", item);
  } else {
    createLocalStorage(curDate, item);
  }
}
