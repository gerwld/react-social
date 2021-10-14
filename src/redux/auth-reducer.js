import { dialogsAPI } from "../api/api";


const SET_USER_DATA = 'soc-net-pjaw/auth-reducer/SET_USER_DATA';
const USER_LOGGED_IN = 'soc-net-pjaw/auth-reducer/USER_LOGGED_IN';
const CAPTCHA_STATUS = 'soc-net-pjaw/auth-reducer/CAPTCHA_STATUS';
const CAPTCHA_TRY = 'soc-net-pjaw/auth-reducer/CAPTCHA_TRY';
const SET_USER_ID = 'soc-net-pjaw/auth-reducer/SET_USER_ID';
const UNREAD_MESSAGES_COUNT = 'soc-net-pjaw/auth-reducer/UNREAD_MESSAGES_COUNT';

export const setUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, data: {userId, email, login, isAuth}});
export const userLoggedIn = () => ({type: USER_LOGGED_IN});
export const captchaTry = () => ({type: CAPTCHA_TRY});
export const captchaStatus = (isShowing, pic) => ({type: CAPTCHA_STATUS, data: {isShowing, pic}});
export const setUserIdAfterLogin = (userId) => ({type: SET_USER_ID, userId});
export const setunreadMessagesCount = (count) => ({type: UNREAD_MESSAGES_COUNT, count});

let initialState = {
    userId: null,
    email: null,
    login: null,
    unreadMessagesCount: 0,
    isAuth: false,
    isFetching: false,

    isCaptchaShow: false,
    captchaUrl: '',
    captchaTryCount: 0
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
        case CAPTCHA_TRY: 
            return {
                ...state,
                captchaTryCount: state.captchaTryCount + 1
            }
        case SET_USER_ID:
            return {
                ...state,
                userId: action.userId
            }
        case UNREAD_MESSAGES_COUNT: 
            return {
                ...state,
                unreadMessagesCount: action.count
            }
        default:
            return state;
    }
}

export const setunreadMessagesCountTC = () => {
    return (dispatch) => {
        dialogsAPI.getUnreadCount().then(r => {
        if(r < 100){
            dispatch(setunreadMessagesCount(r));
        } else {
            dispatch(setunreadMessagesCount('99+'));
        }
        })
    }
}

export default authReducer;