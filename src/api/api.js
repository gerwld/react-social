import axios from "axios";
import { captchaStatus, captchaTry, setUserData, setUserIdAfterLogin, userLoggedIn } from "../redux/auth-reducer";
import { change, stopSubmit } from 'redux-form';

// const instance1 = axios.create({
//     headers: {
//         "API-KEY": "044e15b9-4ab3-4639-87c1-f52961ced893"
//     },
//     baseURL: "https://social-network.samuraijs.com/api/1.0/"
// });

const instance = axios.create({
    // withCredentials: true,
    headers: {
        "origin": "http://localhost:3000/",
        "API-KEY": "044e15b9-4ab3-4639-87c1-f52961ced893"
    },
    baseURL: "https://safe-dawn-56088.herokuapp.com/https://social-network.samuraijs.com/api/1.0/"
});



export const usersAPI = {
    getUsers(pageSize = 6, pageNumber = 1, friends, search) {
        let isSearch = (search && search !== "") ? `&term=${search}` : '';
        let isFriends = friends ? "&friend=true" : '';
        
        return instance.get(`users?count=${pageSize}&page=${pageNumber}${isFriends}${isSearch}`).then(response => response.data);
    },
    getUser(id) {
        console.warn('Obsolete method. Please use profileAPI.');
        return profileAPI.getUser(id);
    },
    followUserRequest(userId) {
        return instance.post(`follow/${userId}`, null).then(r => r.data).catch((reason) => {
            if (reason.response.status === 401) {
                alert(`You are not logged in. Please log in and try again.`);
            }
            else if (reason.response.status === 429) {
                alert(`The maximum number of requests has been exceeded. Try again later.`);
            }
        })
    },
    unfollowUserRequest(userId) {
        return instance.delete(`follow/${userId}`).then(r => r.data);
    },
    getAllFriends(pageNumber = 1, pageSize = 15) {
        return instance.get(`users?friend=true&count=${pageSize}&page=${pageNumber}`).then(r => r.data.items);
    }
}

export const profileAPI = {
    getUser(id) {
        if(id !== undefined){
            return instance.get(`profile/${id}`);
        } else {
            return undefined;
        }
    },
    getStatus(id) {
        return instance.get(`profile/status/${id}`)
    },
    setStatus(status) {
        return instance.put(`profile/status/`, {status: status})
    }
}


export const authAPI = {
    getAuth() {
        return instance.get('/auth/me').then(r => r.data);
    },
    loginInterface(authObject) {
        return instance.post(`/auth/login`, authObject);
    },
    logoutInterface() {
        return instance.delete(`/auth/login`);
    },
    getCaptcha() {
        return instance.get(`/security/get-captcha-url`).then(r => r.data.url);
    }
}

export const entertaimentAPI = {
    getPosts(currPage, serving = 5) {
        return axios.get(`https://safe-dawn-56088.herokuapp.com/https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=${serving}&page=${currPage}&apiKey=1ad6438c671a48ad8c6a0731d8c1eabf`).then(r => r.data.articles);
    }
}




export const dialogsAPI = {
    getDialogs() {
        return instance.get('/dialogs').then(r => r.data);
    },
    getDialogWithUser(userId, page = 1, pageSize = 10) {
        if(userId){
            return instance.get(`/dialogs/${userId}/messages?page=${page}&count=${pageSize}`).then(r => r.data);
        } else return undefined;
    },
    sendMessageToUser(userId, message) {
        return instance.post(`/dialogs/${userId}/messages`, {body: message}).then(r => r.data);
    },
    getUnreadCount() {
        return instance.get('dialogs/messages/new/count').then(r => {
            if(Number.isInteger(r.data)) {
                return r.data;
            } else {
                return 0;
            }
        });
    }
}










//Thunk creators

export const getAuthUserDataTC = () => 
    (dispatch) => {
        return authAPI.getAuth().then(r => {
            if(r.resultCode === 0) {
                dispatch(setUserData(r.data.id, r.data.email, r.data.login, true));
            }
        })
}

export const loginUserTC = (fieldForm, captchaTryCount) => {
    return (dispatch) => {

        authAPI.loginInterface(fieldForm).then(r => {
            dispatch(setUserIdAfterLogin(r.data.data.userId));
            if (r.data.resultCode === 0) {
                dispatch(captchaStatus(false, ''));
                alert('Login successful.');
                dispatch(userLoggedIn());
            }
            else if (r.data.resultCode === 10) {
                dispatch(captchaTry());
                authAPI.getCaptcha().then(pic => {
                    dispatch(captchaStatus(true, pic));
                    if(r.data.messages.length >= 1 && captchaTryCount) {
                        dispatch(stopSubmit('login', {_error: r.data.messages[0]}));
                    } 
                })
            } 
            else {
                dispatch(stopSubmit('login', {_error: r.data.messages[0]}));
            }
            //clear captcha field after submit
            dispatch(change('login', 'captcha', ''));
        })
    }
}

export const logoutUserTC = () => {
    return (dispatch) => {
        authAPI.logoutInterface().then(r => {
            if(r.data.resultCode === 0) {
                dispatch(setUserData(null, null, null, false));
            } 
        })
    }
}
