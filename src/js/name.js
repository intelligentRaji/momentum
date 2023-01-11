export default function setLocalStorage() {
  const text = document.querySelector(".name");
  text.setAttribute("placeholder", "[Enter name]");
  text.value = localStorage.getItem("name");
  text.oninput = () => localStorage.setItem("name", text.value);
}
