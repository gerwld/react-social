import { authAPI } from "../api/api";

//константы и экшн криейторы
const SET_USER_DATA = 'SET_USER_DATA';
const USER_LOGGED_IN = 'USER_LOGGED_IN';
const CAPTCHA_STATUS = 'CAPTCHA_STATUS';

export const setUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, data: {userId, email, login, isAuth}});
export const userLoggedIn = () => ({type: USER_LOGGED_IN});
export const captchaStatus = (isShowing, pic) => ({type: CAPTCHA_STATUS, data: {isShowing, pic}});

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: false,

    isCaptchaShow: false,
    captchaUrl: ''
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
        case CAPTCHA_STATUS: 
            return {
                ...state,
                isCaptchaShow: action.data.isShowing,
                captchaUrl: (action.data.pic || '')
            }
        default:
            return state;
    }
}

export default authReducer;