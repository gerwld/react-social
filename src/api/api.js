import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "e9327719-2998-4837-bc53-8a9b2225f057"
    },
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
})

export const usersAPI = {
    getUsers(pageSize = 6, pageNumber = 1) {
        return instance.get(`users?count=${pageSize}&page=${pageNumber}`).then(response => response.data);
    },
    getUser(id) {
        return instance.get(`profile/${id}`);
    },
    followUserRequest(userId) {
        return instance.post(`follow/${userId}`, null).then(r => r.data);
    },
    unfollowUserRequest(userId) {
        return instance.delete(`follow/${userId}`).then(r => r.data);
    },
    getAuth() {
        return  instance.get('/auth/me').then(r => r.data);
    }
}