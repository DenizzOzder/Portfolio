import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enJSON from '../public/locales/en/translation.json';
import trJSON from '../public/locales/tr/translation.json';

// "translation" sarmalayıcısı(wrapper) varsa içindekini, yoksa direkt dosyanın kendisini alır
const resources = {
  en: {
    translation: enJSON.translation || enJSON
  },
  tr: {
    translation: trJSON.translation || trJSON
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'tr',
    supportedLngs: ['en', 'tr'],
    debug: false,
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
