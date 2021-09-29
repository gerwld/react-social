import { reset } from 'redux-form';
import { profileAPI, usersAPI } from "../api/api";

let initialState = {
    postData: [
        { id: 2, cont: "That site is so cool!", likes: 9 },
        { id: 1, cont: "Deez nuts... Today everything is fine, just vibing with my famity #coolday", likes: 28 },
        { id: 0, cont: "Hi there!! 2007 is rock!", likes: 23 }
    ],
    profile: null,
    // authUserId: 19461,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                postData: [...state.postData,
                { id: state.postData.length, cont: action.message, likes: 0 }],
                newPostText: ""
            };

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }

        default:
            return state;
    }
}

//Thunk Creators

export const getUserInfo = (userId) => {
    return (dispatch) => {
        dispatch(setUserProfile(null));
        usersAPI.getUser(userId).then(r => {
            dispatch(setUserProfile(r.data));
        });

        profileAPI.getStatus(userId).then(r => {
            dispatch(setStatus(r.data));
        });
    }
}

export const setUserStatus = (status) => {
    return (dispatch) => {
        profileAPI.setStatus(status).then(r => {
            if (r.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        });
    }
}

export const sendPost = (submit) => {
    return (dispatch) => {
        dispatch(onAddPost(submit.post));
        dispatch(reset('myPosts'));
    }
}


const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';


//Action Creators
export const onAddPost = (message) => ({ type: ADD_POST, message })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })

export default profileReducer;