export default function setSettingsList() {
  const settings = {
    language: "ru",
    PhotoSourse: [
      { Source: "gitHub", Mode: "on" },
      { Source: "Unsplash", Tags: ["Nature", "City"], Mode: "off" },
      { Source: "Flickr", Tags: ["Nature", "City"], Mode: "off" },
    ],
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
