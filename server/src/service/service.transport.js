
const axios = require('axios');
const logger = require('./service.logger')("TRANSPORT.JS")

async function makeGETRequest(options) {
    logger.info('making GET CALL url: %s headers: %s', options.url, JSON.stringify(options.config.headers))
    try {
        const res = await axios.get(options.url, {
            ...options.params,
            ...options.config
        })

        // logger.info('response received, url: %s, res: %s', options.url, JSON.stringify(res.data))
        return {
            err: null,
            res: res
        }
    } catch (e) {
        logger.info('response received, url: %s, res: %s', options.url, JSON.stringify(e.response && e.response.data ? e.response.data : {}))
        return {
            err: e,
            res: null
        }
    }
}

async function makePOSTRequest(options) {
    logger.info('making POST CALL url: %s data: %s', options.url, JSON.stringify(options.params))
    try {
        const res = await axios.post(options.url, {
            ...options.params,
            ...options.config
        })
        logger.info('POST CALL response received, url: %s req: %s: res: %s', options.url, JSON.stringify(options.params), JSON.stringify(res.data))
        return {
            err: null,
            res: res
        }
    } catch (e) {
        //timeout case not getting data
        logger.error('POST CALL failure url: %s msg: %s', options.url, JSON.stringify(e.response && e.response.data ? e.response.data : {}))
        return {
            err: e,
            res: null
        }
    }
}


module.exports = {
    makeGETRequest,
    makePOSTRequest
}