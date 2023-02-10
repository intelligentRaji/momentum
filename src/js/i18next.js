import i18n from "i18next";
import Backend from "i18next-http-backend";

let lang;
const settings = JSON.parse(localStorage.getItem("RajiSettings"));
if (settings) {
  lang = Object.entries(settings.language).find(
    (element) => element[1] === "on"
  )[0];
} else {
  lang = "english";
}

i18n.use(Backend).init({
  lng: lang || "english",
  supportedLanguages: ["english", "russian", "belarusian"],
  fallbackLng: "russian",
  reloadResources: true,
  backend: {
    loadPath: "./locales/{{lng}}/translation.json",
  },
  initImmediate: false,
});
