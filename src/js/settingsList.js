export default function setSettingsList() {
  const settings = {
    language: {
      russian: "off",
      english: "on",
      belarusian: "off",
    },
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
      links: "on",
    },
  };

  if (!localStorage.getItem("RajiSettings")) {
    localStorage.setItem("RajiSettings", JSON.stringify(settings));
  }
}
