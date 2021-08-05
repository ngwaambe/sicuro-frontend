import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

module.exports = {
    i18n: {
        lng:'en',
        fallbackLng:'en',
        defaultLocale: 'en',
        locales: ['en', 'it', 'es'],
        preload:['en','it','es'],
        ns:[
            'common',
            'home',
            'broker',
            'buynowlink',
            'buyonline',
            'login',
            'policypage',
            'rulespage',
            'security',
            'sellonline',
            'servicepage',
            'slider',
            'transferpage'
        ],
        use:[initReactI18next, LanguageDetector],
        serializeConfig:false,

    },
    react: {
        useSuspense: false,
        wait: true,
        transKeepBasicHtmlNodesFor: ['p','br', 'strong', 'i'],
        transSupportBasicHtmlNodes: true,
        bindI18n: 'languageChanged',
        bindI18nStore: '',
        transEmptyNodeValue: '',
    }
}
