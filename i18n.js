const NextI18Next = require('next-i18next').default

const NextI18NextInstance =  new NextI18Next({
    defaultLanguage: 'en',
    otherLanguages: ['it',"es"],
    fallbackLng: 'en'
})
//NextI18NextInstance.i18n.languages = languages;
module.exports = NextI18NextInstance;
