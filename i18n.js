const NextI18Next = require("next-i18next").default;

const NextI18NextInstance = new NextI18Next({
    defaultLanguage: 'en',
    otherLanguages: ['it',"es", "de"]
})
export const {
    Link,
    i18n,
    appWithTranslation,
    withTranslation,
} = NextI18NextInstance