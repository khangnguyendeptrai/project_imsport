import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

// Lấy ngôn ngữ lưu trong localStorage, mặc định là 'vi'
const savedLanguage =
  typeof window !== "undefined"
    ? window.localStorage.getItem("language") || "vi"
    : "vi";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: savedLanguage,
    fallbackLng: "vi",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      // Với Vite, file tĩnh nên nằm trong public
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });

export default i18n;
