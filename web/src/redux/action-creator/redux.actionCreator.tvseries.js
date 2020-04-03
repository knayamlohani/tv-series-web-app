import * as TVSERIES_ACTION from '../action/redux.action.tvseries';
import * as TVSERIES_ACTION_STATUS_INDICATOR from '../action/redux.action.tvseries.indicator'
import * as seriesMappingService from '../../services/service.series'


import axios from 'axios'

export const setCurrentSeriesBasicInfo = (options) => (dispatch, getState) => dispatch(updateSeriesInfo({
    payload: seriesMappingService.mapSeriesData({
            ...options.payload
        }, getState().tvSeries.currentSeries
    )
}));

export const setCurrentSeriesFullInfo = (options) => (dispatch, getState) => dispatch(updateSeriesInfo({
    payload: seriesMappingService.mapSeriesData({
            ...options.payload
        }, getState().tvSeries.currentSeries
    )
}));


export const setCurrentSeriesEpisodes = (options) => (dispatch, getState) => dispatch(updateSeriesInfo({
    payload: seriesMappingService.mapSeriesData({
            ...options.payload
        }, getState().tvSeries.currentSeries
    )
}));

export const setCurrentSeriesCast = (options) => (dispatch, getState) => dispatch(updateSeriesInfo({
    payload: seriesMappingService.mapSeriesData({
            ...options.payload
        }, getState().tvSeries.currentSeries
    )
}));


export const updateSeriesInfo = (options) => {
    return {
        type: TVSERIES_ACTION.UPDATE_SERIES_INFO,
        ...options
    };
};


export const setSeriesSearchResults = (options) => {
    return {
        type: TVSERIES_ACTION.SET_SERIES_SEARCH_RESULTS,
        ...options
    }
};


export const setActiveEpisodeKey = (options) => {
    return {
        type: TVSERIES_ACTION.SET_ACTIVE_EPISODE_KEY,
        ...options
    }
};

export const setActiveSeasonKey = (options) => {
    return {
        type: TVSERIES_ACTION.SET_ACTIVE_SEASON_KEY,
        ...options
    }
};

export const setAnySeasonEverSelectedStatus = (options) => {
    return {
        type: TVSERIES_ACTION.SET_ANY_SEASON_EVER_SELECTED_STATUS,
        ...options
    }
};


export const searchSeriesByName = (options) => {
    return (dispatch) => {
        console.log('options', options);
        dispatch(setSeriesSearchResults({
            payload: {
                seriesSearchResults: []
            }
        }));
        dispatch(setSearchingSeriesStatus({
            payload: {
                isSearchingSeries: true
            }
        }));

        axios.get(`/api/series?name=${options.payload.series.name}`).then((response) => {
            console.log(response);
            dispatch(setSeriesSearchResults({
                payload: {
                    seriesSearchResults: response.data.data.matchedSeriesList
                }
            }));
            dispatch(searchingSeriesSuccess());
        })

    }
};

export const getSeriesById = (options) => {
    return (dispatch) => {
        console.log('gete series by id ', options);
        // dispatch(searchingSeries());
        axios.get(`/api/series/${options.payload.series.id}`).then((response) => {
            console.log('response', response.data.data.series);
            dispatch(setCurrentSeriesFullInfo({
                payload: {
                    fullInfo: response.data.data.series
                }
            }));
        }).catch(() => {

        })

    }
};


export const getEpisodesForCurrentSeries = (options) => {
    return (dispatch) => {
        axios.get(`/api/series/${options.payload.series.id}/episodes`).then((response) => {
            // console.log('response', response.data.data.episodes);

            console.log("PAGE INFO =====", response.data.data.pageInfo)

            dispatch(setCurrentSeriesEpisodes({
                payload: {
                    episodes: response.data.data.episodes
                }
            }));

            if (response.data.data.pageInfo && response.data.data.pageInfo.next) {

                const promises = [];
                for (let i = response.data.data.pageInfo.next; i <= response.data.data.pageInfo.last; i++) {
                    promises.push(
                        axios.get(`/api/series/${options.payload.series.id}/episodes?page=${i}`)
                    )
                }

                console.log("PROMISE SIZE ============", promises.length);

                axios.all(promises).then((responses) => {
                    console.log("ALL PAGINATED RESPONSE ==========", responses);

                    let episodes = [];

                    for (let response of responses) {
                        episodes = episodes.concat(response.data.data.episodes)
                    }

                    dispatch(setCurrentSeriesEpisodes({
                        payload: {
                            episodes: episodes
                        }
                    }));

                })
            }

        })

    }
};

export const getCastForCurrentSeries = (options) => {
    return (dispatch) => {
        axios.get(`/api/series/${options.payload.series.id}/cast`).then((response) => {
            console.log('response', response.data.data.series);
            dispatch(setCurrentSeriesCast({
                payload: {
                    castMembers: response.data.data.castMembers
                }
            }));
        })

    }
};


// action indicators

export const setSearchingSeriesStatus = (options) => {
    return {
        type: TVSERIES_ACTION_STATUS_INDICATOR.SET_SEARCHING_SERIES_STATUS,
        ...options
    };
};

export const searchingSeriesSuccess = (options) => {
    return {
        type: TVSERIES_ACTION_STATUS_INDICATOR.SEARCHING_SERIES_SUCCESS,
        ...options
    };
};

export const searchingSeriesFailure = (options) => {
    return {
        type: TVSERIES_ACTION_STATUS_INDICATOR.SEARCHING_SERIES_FAILURE,
        ...options
    };
};