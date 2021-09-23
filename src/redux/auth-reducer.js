import { authAPI } from "../api/api";

//константы и экшн криейторы
const SET_USER_DATA = 'SET_USER_DATA';
const USER_LOGGED_IN = 'USER_LOGGED_IN';

export const setUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, data: {userId, email, login, isAuth}});
export const userLoggedIn = () => ({type: USER_LOGGED_IN});

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_DATA: 
            return {
                ...state,
                ...action.data,
                isAuth: action.data.isAuth
            }
        case USER_LOGGED_IN:
            return {
                ...state,
                isAuth: true
            }
        default:
            return state;
    }
}


export default authReducer;