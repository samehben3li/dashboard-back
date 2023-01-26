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
            ID: 'ID',
            LOGIN: 'Login',
            EMAIL: 'Email',
            PASSWORD: 'Password',
            USERNAME: 'Username',
            IS_ADMIN: 'IS ADMIN',
          },
          sidebarItem: {
            USERS: 'USERS',
            LOGOUT: 'LOGOUT',
          },
          titles: {
            USERS_LIST: 'Users List',
            NEW_USER_INFO: 'Information of new user',
            UPDATE_USER: 'Update user',
            QUESTION_DELETE_USER: 'do you want to delete ',
          },
          actions: {
            CREATE: 'Create',
            UPDATE: 'Update',
            DELETE: 'Delete',
            CANCEL: 'Cancel',
          },
          header: {
            NEW_USER: 'New User',
          },
          errors: {
            NOT_ADMIN: "You're not an Admin",
            INCORRECT_CREDENTIALS: 'Wrong credentials',
            SOMETHING_WENT_WRONG: 'something went wrong !',
            INFORATION_ALREADY_EXIST: 'this information already exist !',
          },
        },
      },
    },
  })
  .catch(() => new Error('Invalid translation'));

export default i18n;
