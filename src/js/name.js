import i18n from "i18next";

export default function setLocalStorage() {
  const text = document.querySelector(".name");
  text.classList.add("lng");
  text.id = "name";
  i18n.on("loaded", () => {
    text.setAttribute("placeholder", i18n.t(text.id));
  });
  text.value = localStorage.getItem("name") || null;
  text.oninput = () => localStorage.setItem("name", text.value);
}
