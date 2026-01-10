import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";

const defaultLanguage = getLocales()[0].languageCode;
const resources = {
  en: {
    translation: require("../locales/en.json"),
  },
  ar: {
    translation: require("../locales/ar.json"),
  },
};

i18n.use(initReactI18next).init({
  resources: resources,
  lng: defaultLanguage || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const getLanguage = async () => {
  const language = await AsyncStorage.getItem("language");
  if (language) {
    i18n.changeLanguage(language);
    I18nManager.allowRTL(language === "ar");
    I18nManager.forceRTL(language === "ar");
  }
};
getLanguage();
