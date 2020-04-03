import redux, { createStore, applyMiddleware } from 'redux'


import rootReducer from './../redux/reducer/redux.reducer.root'
import ReduxThunk from 'redux-thunk';

const store = createStore(
    rootReducer,
    {
        tvSeries: {
            currentSeries: null,
            seriesSearchResults: [],
            searchingSeries: false,
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
