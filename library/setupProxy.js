import {citfBaseUrl} from "../config";

const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        proxy(`${citfBaseUrl}/vaccination/vax_malaysia.csv`, {
            target: 'https://github.com',
            changeOrigin: true
        })
    )
}