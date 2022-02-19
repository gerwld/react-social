import React from 'react'
import { getAuthUserDataTC } from '../api/api';
import { setunreadMessagesCountTC } from './auth-reducer';


const SET_INITIALIZING = 'soc-net-pjaw/app-reducer/SET_INITIALIZING';
const TOGGLE_THEME = 'soc-net-pjaw/app-reducer/TOGGLE_THEME';
export const setInitializingSuccess = () => ({type: SET_INITIALIZING});
export const toggleTheme = (boolean) => ({type: TOGGLE_THEME, boolean})


let initialState = {
    initialized: false,
    darkTheme: false
};

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_INITIALIZING:
            return {
                ...state,
                initialized: true
            }
            case TOGGLE_THEME:
                return {
                    ...state,
                    darkTheme: action.boolean
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

export const toggleThemeThunk = (boolean) => {
    return (dispatch) => {
        dispatch(toggleTheme(boolean));
        localStorage.setItem('theme', boolean);
    }
}

export default appReducer;