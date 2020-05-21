const NextI18Next = require('next-i18next').default
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig

const languages = ['en-GB', 'es-ESP', 'it-ITA'];
const localeSubpathVariations = {
    none: {},
    foreign: {
        es: 'es',
        it:'it'
    },
    all: {
        en: 'en',
        es: 'es',
        it:'it'
    },
}
const NextI18NextInstance =  new NextI18Next({
    defaultLanguage: 'en',
    otherLanguages: ['it',"es"],
    fallbackLng: 'en',
    localeSubpaths: {
        it:'it',
        es:'es'
    }
})
NextI18NextInstance.i18n.languages = languages;
module.exports = NextI18NextInstance;