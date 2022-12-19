const  { initReactI18next } = require('react-i18next')

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
        use:[initReactI18next],
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
