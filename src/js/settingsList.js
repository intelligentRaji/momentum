export default function setSettingsList() {
  const settings = {
    language: "ru",
    PhotoSourse: "gitHub",
    tags: "nature",
    blocks: {
      time: "on",
      date: "on",
      "greeting-container": "on",
      quotes: "on",
      weather: "on",
      player: "on",
      todo: "on",
    },
  };

  if (!localStorage.getItem("RajiSettings")) {
    localStorage.setItem("RajiSettings", JSON.stringify(settings));
  }
}
