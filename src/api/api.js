import axios from "axios";
import { setUserData } from "../redux/auth-reducer";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "0655bfbe-786a-4f38-ac1a-9dc225f7b1db"
    },
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
});

export const usersAPI = {
    getUsers(pageSize = 6, pageNumber = 1) {
        return instance.get(`users?count=${pageSize}&page=${pageNumber}`).then(response => response.data);
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
    }
}

export const profileAPI = {
    getUser(id) {
        return instance.get(`profile/${id}`);
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
    }
}

//Thunk creators

export const getAuthUserDataTC = () => {
    return (dispatch) => {
        authAPI.getAuth().then(r => {
            if(r.resultCode === 0) {
                dispatch(setUserData(r.data.id, r.data.email, r.data.login));
            }
        })
    }
}