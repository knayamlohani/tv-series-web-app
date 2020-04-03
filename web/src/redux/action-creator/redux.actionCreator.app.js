import {UPDATE_SEARCH_COMPONENT_IS_ACTIVE_STATE} from "../action/redux.action.app";

export const updateSearchComponentIsActiveState = (options) => {
    return {
        type: UPDATE_SEARCH_COMPONENT_IS_ACTIVE_STATE,
        ...options
    }
}