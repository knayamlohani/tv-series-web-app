import * as TVSERIES_ACTION from './../action/redux.action.tvseries'
import * as TVSERIES_ACTION_STATUS_INDICATOR from './../action/redux.action.tvseries.indicator'
import * as SEARCH_STATUS from './../../constant/constant.search-status'

const tvseriesReducer = (state = {}, action) => {

    console.log('action ...', action)

    switch (action.type) {


        case TVSERIES_ACTION.UPDATE_SERIES_INFO:
            return {
                ...state,
                currentSeries: action.payload.currentSeries
            };

        case TVSERIES_ACTION.SET_SERIES_SEARCH_RESULTS:
            return {
                ...state,
                seriesSearchResults: action.payload.seriesSearchResults
            };


        case TVSERIES_ACTION_STATUS_INDICATOR.SET_SEARCHING_SERIES_STATUS:
            return {
                ...state,
                searchSeriesStatus: action.payload.searchSeriesStatus
            };

        case TVSERIES_ACTION.SET_ACTIVE_EPISODE_KEY:
            return {
                ...state,
                activeEpisodeKey: action.payload.activeEpisodeKey
            };

        case TVSERIES_ACTION.SET_ACTIVE_SEASON_KEY:
            return {
                ...state,
                activeSeasonKey: action.payload.seasonKey
            };

        case TVSERIES_ACTION.SET_ANY_SEASON_EVER_SELECTED_STATUS:
            return {
                ...state,
                anySeasonEverSelected: action.payload.status
            };

        default:
            return state;
    }
};

export default tvseriesReducer;