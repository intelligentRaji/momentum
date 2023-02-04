export default function setSettingsList() {
  const settings = {
    language: "ru",
    PhotoSource: {
      gitHub: {
        Mode: "on",
      },
      Unsplash: {
        Tags: [
          { name: "Nature", mode: "on" },
          { name: "City", mode: "off" },
        ],
        Mode: "off",
      },
      Flickr: {
        Tags: [
          { name: "Nature", mode: "on" },
          { name: "City", mode: "off" },
        ],
        Mode: "off",
      },
    },
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
