import {UPDATE_SEARCH_COMPONENT_IS_ACTIVE_STATE} from "../action/redux.action.app";

const appReducer = (state = {}, action) => {

    console.log("APP ACTION DISPATCHED", action);

    switch (action.type) {
        case UPDATE_SEARCH_COMPONENT_IS_ACTIVE_STATE:
            return {
                ...state,
                isSearchComponentActive: action.payload.isActive
            };

        default:
            return state;
    }
};


export default appReducer;