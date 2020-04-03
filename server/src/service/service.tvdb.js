const tvdbConfig = require('../config/config-loader').tvdbConfig;
const logger = require('./service.logger')("TVDB.JS");
const tvdbProvider = require('../provider/provider.tvdb')


async function searchSeriesByName(options = {}) {
    providerResponse = await tvdbProvider.searchSeriesByName(options);
    return {
        err: null,
        data: {
            matchedSeriesList: providerResponse.res.data.data
        }
    }
}

async function searchSeriesById(options = {}) {
    providerResponse = await tvdbProvider.searchSeriesById(options);
    return {
        err: null,
        data: {
            series: providerResponse.res.data.data
        }
    }
}

async function getEpisodesForSeriesWithId(options = {}) {
    providerResponse = await tvdbProvider.getEpisodesForSeriesWithId(options);
    return {
        err: null,
        data: {
            episodes: providerResponse.res.data.data,
            pageInfo: {
                ...providerResponse.res.data.links
            }
        }
    }
}

async function getCastForSeriesWithId(options = {}) {
    providerResponse = await tvdbProvider.getCastForSeriesWithId(options);
    return {
        err: null,
        data: {
            castMembers: providerResponse.res.data.data
        }
    }
}


module.exports = {
    searchSeriesByName,
    searchSeriesById,
    getEpisodesForSeriesWithId,
    getCastForSeriesWithId
};