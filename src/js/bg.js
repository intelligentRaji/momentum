export default function getBg() {
  let number = String(Math.floor(1 + Math.random() * (20 - 1))).padStart(
    2,
    "0"
  );
  const body = document.querySelector("body");
  let time = new Date();
  let timefase = ["night", "morning", "afternoon", "evening"];
  let quarter = Math.floor(time.getHours() / 6);

  function setBg() {
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/intelligentRaji/stage1-tasks/assets/images/${timefase[quarter]}/${number}.jpg`;
    img.onload = () => {
      body.style.backgroundImage = `url('https://raw.githubusercontent.com/intelligentRaji/stage1-tasks/assets/images/${timefase[quarter]}/${number}.jpg')`;
    };
  }

  setBg();

  const next = document.querySelector(".slide-next");
  const prev = document.querySelector(".slide-prev");

  function getSlideNext() {
    if (number == 20) {
      number = "01";
    } else {
      number = String(+number + 1).padStart(2, "0");
    }
    setBg();
  }

  function getPrevSlide() {
    if (number == 1) {
      number = "20";
    } else {
      number = String(+number - 1).padStart(2, "0");
    }
    setBg();
  }

  next.addEventListener("click", getSlideNext);
  prev.addEventListener("click", getPrevSlide);
}
