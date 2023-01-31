import checkmark from "../../../assets/svg/checkmark.svg";
import cross from "../../../assets/svg/cross.svg";
import trashurl from "../../../assets/svg/trash.svg";
import { createElem, trimDate } from "../utils.js";
import { createLocalStorage, deleteLocalStorageItem } from "../localStorage.js";

export default function createDeal(
  obj,
  type,
  text,
  status = "",
  date = new Date()
) {
  console.log(status);
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

  const textDeal = createElem("p", "todo-item-text", obj.deal, text);
  obj.trash = createElem("div", "todo-trash", obj.deal);
  obj.trash.addEventListener("click", () => {
    obj.deal.remove();
    deleteLocalStorageItem(curDate, text);
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

  createLocalStorage(curDate, item);
}
