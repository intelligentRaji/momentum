import { removeChilds, trimDate, yesterdayDate } from "../utils.js";

export function createLocalStorage(date, obj) {
  try {
    if (!localStorage.getItem(date)) {
      localStorage.setItem(date, JSON.stringify([obj]));
    } else {
      const item = JSON.parse(localStorage.getItem(date));
      item.push(obj);
      localStorage.setItem(date, JSON.stringify(item));
    }
  } catch (e) {
    console.log("Bad JSON");
  }
}

export function deleteLocalStorageItem(date, text) {
  let obj = JSON.parse(localStorage.getItem(date));
  obj.forEach((element) => {
    if (element.text === text) {
      obj.splice(obj.indexOf(element), 1);
    }
  });
  localStorage.setItem(date, JSON.stringify(obj));
}

export function getLocalStorageItem(name, text) {
  const obj = JSON.parse(localStorage.getItem(name));
  let item;
  obj.forEach((element) => {
    if (element.text === text) {
      item = element;
    }
  });
  return item;
}

export function getListFromLocalSotrage(
  date,
  input,
  parent,
  dateNumeric = new Date()
) {
  if (localStorage.getItem(date)) {
    const list = JSON.parse(localStorage.getItem(date));
    localStorage.removeItem(date);
    list.forEach((element) => {
      input.InputCreateDeal(
        element.type,
        element.text,
        parent,
        element.status,
        dateNumeric
      );
    });
  }
}

export function getListOnDayChange(input, parent, currentDate, yestardayDate) {
  removeChilds(parent);
  const yesterdayList = JSON.parse(localStorage.getItem(yestardayDate));
  localStorage.removeItem(yestardayDate);
  const todayList = JSON.parse(localStorage.getItem(currentDate));
  localStorage.removeItem(currentDate);
  todayList.forEach((element) => {
    input.InputCreateDeal(
      "Today",
      element.text,
      parent,
      element.status
      //currentDate
    );
  });
  for (let element of yesterdayList) {
    if (element.status === "completed") {
      continue;
    } else {
      input.InputCreateDeal(
        "Today",
        element.text,
        parent,
        element.status
        //currentDate
      );
    }
  }
}

export function getListForFirstTime(
  date,
  input,
  parent,
  dateNumeric = new Date()
) {
  if (localStorage.getItem(date)) {
    const list = JSON.parse(localStorage.getItem(date));
    localStorage.removeItem(date);
    list.forEach((element) => {
      input.InputCreateDeal(
        "Today",
        element.text,
        parent,
        element.status,
        dateNumeric
      );
    });
  }
}
