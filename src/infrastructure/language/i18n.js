import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation from "../../../translation.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {
      translation: translation.en, // English translations from the JSON file
    },
    es: {
      translation: translation.es, // Spanish translations from the JSON file
    },
  },
  lng: "es", // Set the default language
  fallbackLng: "en", // Fallback language if the requested translation is missing
  interpolation: {
    escapeValue: false, // React components are already escaped by default
  },
});

export default i18n;
