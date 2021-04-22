const { i18n } = require('./next-i18next.config')
const memCache = require("./service/get-cache");
module.exports = {
    i18n,
    serverRuntimeConfig: {
        memCache: memCache
    }
}
