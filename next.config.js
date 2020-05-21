const withLess = require('@zeit/next-less')
const withCSS = require("@zeit/next-css");

module.exports = withCSS(
    withLess({
        webpack(config, options) {
            return config;
        },
        publicRuntimeConfig:{
            localeSubpaths: typeof process.env.LOCALE_SUBPATHS === 'string'
                ? process.env.LOCALE_SUBPATHS
                : 'none',
        }
    }),
);