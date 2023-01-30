export function createElem(tag, clas, parentElem, text = "", src = undefined) {
  // Создает дом элемент
  const element = document.createElement(tag);
  element.className = clas;
  element.textContent = text;
  if (src != undefined) element.src = src;
  parentElem.append(element);
  return element;
}

export class baseComponent {
  constructor(parent, tag = "div", classNames, textContent = "") {
    this.element = document.createElement(tag);
    this.element.classList.add(classNames);
    parent.append(this.element);
    if (textContent != undefined) this.element.textContent = textContent;
  }
}

export function addClass(el, className) {
  el.classList.add(className);
}

export function removeClass(el, className) {
  el.classList.remove(className);
}

export function trimDate(date) {
  const name = `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`;
  return name;
}

export function tommorowDate(date) {
  const futureDate = new Date(date.setDate(date.getDate() + 1));
  return futureDate;
}

export function yesterdayDate(date) {
  const yesterdayDate = new Date(date.setDate(date.getDate() - 1));
  return yesterdayDate;
}

export function removeChilds(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
