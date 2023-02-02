export default function setSettingsList() {
  const settings = {
    language: "ru",
    PhotoSourse: "gitHub",
    tags: "nature",
    blocks: {
      time: "on",
      date: "on",
      greeting: "on",
      quote: "on",
      weather: "on",
      audio: "on",
      todolist: "on",
    },
  };

  localStorage.setItem("RajiSettings", JSON.stringify(settings));
}
