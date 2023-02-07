export function createElem(tag, clas, parentElem, text = "", src = undefined) {
  // Создает дом элемент
  const element = document.createElement(tag);
  element.className = clas;
  element.textContent = text;
  if (src != undefined) element.src = src;
  parentElem.append(element);
  return element;
}

export class BaseComponent {
  constructor(
    parent,
    tag = "div",
    className = undefined,
    text = undefined,
    src = undefined
  ) {
    this.element = document.createElement(tag);
    if (className != undefined) this.element.className = className;
    parent.append(this.element);
    if (text != undefined) this.element.textContent = textContent;
    if (src != undefined) this.element.src = src;
  }
}

export function addClass(el, className) {
  el.classList.add(className);
}

export function removeClass(el, className) {
  el.classList.remove(className);
}

export function trimDate(date) {
  console.log(date);
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

export function ToUpperCase(text) {
  return text[0].toUpperCase() + text.slice(1);
}

export function hideSetction(section) {
  const settings = JSON.parse(localStorage.getItem("RajiSettings"));
  const property = section.className.split(" ")[0];
  if (settings.blocks[property] === "off") {
    section.style.transition = "all 0s ease 0s";
    section.classList.add("invisible");
  }
}
