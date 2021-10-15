import React from 'react'
import { getAuthUserDataTC } from '../api/api';
import { setunreadMessagesCountTC } from './auth-reducer';


const SET_INITIALIZING = 'soc-net-pjaw/app-reducer/SET_INITIALIZING';
export const setInitializingSuccess = () => ({type: SET_INITIALIZING});


let initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_INITIALIZING:
            return {
                ...state,
                initialized: true
            }
        
        default:
            return state;
    }
}

export const initializeApp = () => {
    return async (dispatch) => {
        await dispatch(getAuthUserDataTC());
        await dispatch(setunreadMessagesCountTC());

        dispatch(setInitializingSuccess());
    }
}

export default appReducer;