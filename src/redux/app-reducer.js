import React from 'react'
import { getAuthUserDataTC } from '../api/api';
import { setunreadMessagesCount, setunreadMessagesCountTC } from './auth-reducer';

//константы и экшн криейторы
const SET_INITIALIZING = 'SET_INITIALIZING';


export const setInitializingSuccess = () => ({type: SET_INITIALIZING});


let initialState = {
    initialized: false
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
    return (dispatch) => {
        let promise = dispatch(getAuthUserDataTC());
        dispatch(setunreadMessagesCountTC());
        promise.then(()=> {
            dispatch(setInitializingSuccess());
        })
    }
}

export default appReducer;