const NextI18Next = require("next-i18next").default;

const NextI18NextInstance = new  NextI18Next({
    defaultLanguage: 'en',
    otherLanguages: ['it'],
    localePath: typeof window === "undefined" ? "public/lang" : "lang"
})

export const {
    appWithTranslation,
    withTranslation,
} = NextI18NextInstance