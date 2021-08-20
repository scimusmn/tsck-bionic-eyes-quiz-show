import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { commonAR, commonEN, quizAR, quizEN } from './content';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
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

    lng: 'en', // change to ar
    fallbackLng: 'en', // change to ar

    react: {
      useSuspense: false,
    },
  });

export default i18n;
