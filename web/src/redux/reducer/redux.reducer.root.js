import {combineReducers} from "redux";


// reducer imports
import tvseriesReducer from './redux.reducer.tvseries'
import appReducer from "./redux.reducer.app";

const rootReducer = combineReducers({
    tvSeries: tvseriesReducer,
    app: appReducer
});


export default rootReducer;