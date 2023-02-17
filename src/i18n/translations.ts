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
          riskCategory: {
            RISK_CATEGORY: 'Risk Category',
            ID: 'ID',
            NAME: 'name',
            IMAGE: 'image',
            TYPES: 'Types',
            RISK_CATEGORY_TYPES: 'RISK CATEGORY TYPES',
          },
          flags: {
            ID: 'ID',
            RISK_CATEGORY: 'RISK CATEGORY',
            RISK_CATEGORY_TYPE: 'RISK CATEGORY TYPE',
            PLANT_PART: 'PLANT PART',
            LOCATION: 'LOCATION',
          },
          sidebarItem: {
            USERS: 'USERS',
            RISK_CATEGORIES: 'RISK CATEGORIES',
            FLAGS: 'Flags',
            LOGOUT: 'LOGOUT',
          },
          titles: {
            USERS_LIST: 'Users List',
            NEW_USER_INFO: 'Information of new user',
            UPDATE_USER: 'Update user',
            QUESTION_DELETE: 'do you want to delete {{name}} ?',
            RISK_CATEGORIES_LIST: 'Risk Categories List',
            ADD_RISK_CATEGORY: 'ADD RISk CATEGORY',
            ADD_RISK_CATEGORY_TYPE: 'ADD RISk CATEGORY TYPE',
            UPDATE_RISK_CATEGORY_TYPE: 'Update RISk CATEGORY TYPE',
            FLAGS_LIST: 'Flags List',
          },
          actions: {
            CREATE: 'Create',
            UPDATE: 'Update',
            DELETE: 'Delete',
            CANCEL: 'Cancel',
            SAVE: 'Save',
            ADD: 'Add',
            NEW_TYPES: 'New Type',
          },
          header: {
            NEW_USER: 'New User',
            NEW_RISK_CATEGORY: 'New Risk Category',
          },
          errors: {
            NOT_AUTHORIZED: "You're not an Admin",
            INCORRECT_CREDENTIALS: 'Wrong credentials',
            SOMETHING_WENT_WRONG: 'Something went wrong !',
            INFORMATION_ALREADY_EXIST: 'This information already exist !',
            USER_NOT_FOUND: 'User not found !',
            NOT_LOGGED_IN: 'Not logged in',
            INVALID_TOKEN: 'Invalid token',
            USERS_NOT_FOUND: 'Users Not Found !',
            'Failed to fetch': 'Check your internet connection !',
            'invalid signature': 'Invalid token',
          },
        },
      },
    },
  })
  .catch(() => new Error('Invalid translation'));

export default i18n;
