const transportService = require('./../service/service.transport');
const logger = require('./../service/service.logger')("TVDB_PROVIDER")

const tvdbConfig = require('../config/config-loader').tvdbConfig
let authToken = null;

// fetches auth token by loggin in tvdb
async function getAuthToken(options = {}) {
    const response = await transportService.makePOSTRequest({
        url: tvdbConfig.api.login,
        params: {
            apikey: tvdbConfig.credentials.apikey
        }
    }).then((apiResponse) => {
        if (apiResponse.err) {


            throw new Error("Unexpected error");
        } else {
            logger.info('successfully fetched auth token')
            authToken = apiResponse.res.data.token
            return authToken
        }
    })

    return response;
}

async function processResponse(apiResponse, apiRetryHandler, apiRequestOptions) {
    err = apiResponse.err;
    res = apiResponse.res;

    if (err) {

        if (err && err.response && err.response.status == "401") {
            logger.error("AUTH TOKEN expired, refreshing token")
            authToken = await getAuthToken();
            apiRetryResponse = await apiRetryHandler(apiRequestOptions)
            return apiRetryResponse;
        } else {
            throw new Error("Unexpected error")
        }

        // add normal error checks

    } else {
        return apiResponse
    }
}


// searches series by name with auth token refresh handling
async function searchSeriesByName(options) {
    response = await searchSeriesByNameOnly(options).then((apiResponse) => {
        return processResponse(apiResponse, apiRetryHandler = searchSeriesByNameOnly, options)
    })

    return response
}


//searches series by name
async function searchSeriesByNameOnly(options) {
    return await transportService.makeGETRequest({
        url: `${tvdbConfig.api.searchSeriesByName}?name=${options.series.name}`,
        config: {
            headers: {
                ...getAuthorizationHeader()
            }
        },
        params: {
            name: options.series.name
        },
    })
}

// searches series by id with auth token refresh handling
async function searchSeriesById(options) {
    response = await searchSeriesByIdOnly(options).then((apiResponse) => {
        return processResponse(apiResponse, apiRetryHandler = searchSeriesByIdOnly, options)
    });

    return response
}


//searches series by id
async function searchSeriesByIdOnly(options) {
    id = options.series.id;
    logger.info('series id %s', id)
    return await transportService.makeGETRequest({
        url: tvdbConfig.api.getSeriesById(options.series.id),
        config: {
            headers: {
                ...getAuthorizationHeader()
            }
        },
        params: {
            name: options.series.name
        },
    })
}


async function getEpisodesForSeriesWithId(options) {
    logger.info("getEpisodesForSeriesWithId %s", JSON.stringify(options));
    response = await getEpisodesForSeriesWithIdOnly(options).then((apiResponse) => {
        return processResponse(apiResponse, apiRetryHandler = getEpisodesForSeriesWithIdOnly, options)
    });

    return response
}


//searches series by id
async function getEpisodesForSeriesWithIdOnly(options) {
    id = options.series.id;
    logger.info('series id %s', id);

    return await transportService.makeGETRequest({
        url: tvdbConfig.api.getEpisodesForSeriesById(id, options.series.page),
        config: {
            headers: {
                ...getAuthorizationHeader()
            }
        }
    })
}


async function getCastForSeriesWithId(options) {
    logger.info("getCastForSeriesWithId %s", JSON.stringify(options));
    response = await getCastForSeriesWithIdOnly(options).then((apiResponse) => {
        return processResponse(apiResponse, apiRetryHandler = getCastForSeriesWithIdOnly, options)
    });

    return response
}


//searches series by id
async function getCastForSeriesWithIdOnly(options) {
    id = options.series.id;
    logger.info('series id %s', id);

    return await transportService.makeGETRequest({
        url: tvdbConfig.api.getCastForSeriesById(id),
        config: {
            headers: {
                ...getAuthorizationHeader()
            }
        }
    })
}


(async function () {
    if (authToken == null) {
        try {
            authToken = await getAuthToken()
        } catch (e) {
            throw new Error("Auth Token fetch Failure")
        }
    }
})();

// returns tvdb authorization token
const getAuthorizationHeader = () => {
    if(authToken == null) {
        getAuthToken();
    }

    return {
        'Authorization': `Bearer ${authToken}`
    }
};


module.exports = {
    searchSeriesByName,
    searchSeriesById,
    getEpisodesForSeriesWithId,
    getCastForSeriesWithId
};