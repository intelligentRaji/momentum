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
