import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import es from './es.json';
import {AppLanguages} from '../constants';

const resources = {en, es};

export const i18nInit = async (lng: string) => {
  return await i18n.use(initReactI18next).init({
    resources,
    debug: false,
    compatibilityJSON: 'v3',
    lng,
    fallbackLng: 'en',
    supportedLngs: AppLanguages.map(language => language.id),
  });
};

export default i18n;
