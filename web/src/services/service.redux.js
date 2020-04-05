import redux, { createStore, applyMiddleware } from 'redux'


import rootReducer from './../redux/reducer/redux.reducer.root'
import ReduxThunk from 'redux-thunk';
import {UNKNOWN} from "../constant/constant.search-status";

const store = createStore(
    rootReducer,
    {
        tvSeries: {
            currentSeries: null,
            seriesSearchResults: [],
            searchSeriesStatus: UNKNOWN,
            activeEpisodeKey: null,
            activeSeasonKey: null,
            anySeasonEverSelected: false
        },
        app: {
            isSearchComponentActive: false
        }
    },
    applyMiddleware(ReduxThunk)
);

export default store;
