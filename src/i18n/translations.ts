import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          login: {
            login: 'Login',
            email: 'Email Address',
            password: 'Password',
          },
          errors: {
            NOT_ADMIN: "You're not an Admin",
            INCORRECT_CREDENTIALS: 'Wrong credentials',
          },
        },
      },
    },
  })
  .catch(() => new Error('Invalid translation'));

export default i18n;
