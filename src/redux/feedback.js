import * as ActionTypes from './ActionTypes';

export const Feedback = (state  = {  errMess: null,
    feedbacks:[]}, action) => {
        switch (action.type) {
            case ActionTypes.ADD_FEEDBACK:
                return {...state, errMess: null, feedbacks: action.payload};

            case ActionTypes.FEEDBACK_FAILED:
                return {...state, errMess: action.payload};

            default:
                return state;
        }
};