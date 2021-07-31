import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { commonAR, commonEN, quizAR, quizEN } from './content';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      ar: {
        common: commonAR,
        quiz: quizAR,
      },
      en: {
        common: commonEN,
        quiz: quizEN,
      },
    },

    ns: ['common', 'quiz'],
    defaultNS: 'common',

    lng: 'ar', // if you're using a language detector, do not define the lng option
    fallbackLng: 'ar',

    react: {
      useSuspense: false,
    },
  });

export default i18n;
