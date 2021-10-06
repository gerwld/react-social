import { reset } from 'redux-form';
import { profileAPI } from "../api/api";

let initialState = {
    postData: [
        { id: 0, cont: "That site is so cool!", likes: 9 },
        { id: 1, cont: "Deez nuts... Today everything is fine, just vibing with my famity #coolday", likes: 28 },
        { id: 2, cont: "Hi there!! 2007 is rock!", likes: 23 }
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
        case DELETE_POST: {
            return {
                ...state,
                postData: state.postData.filter(r => r.id !== action.postId)
            }
        }
        default:
            return state;
    }
}

//Thunk Creators
export const getUserInfo = (userId) => {
    return async (dispatch) => {
        await dispatch(setUserProfile(null));
        let status = await profileAPI.getStatus(userId);
        dispatch(setStatus(status));

        let user = await profileAPI.getUser(userId);
        dispatch(setUserProfile(user));
    }
}

export const setUserStatus = (status) => {
    return async (dispatch) => {
        let response = await profileAPI.setStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    }
}

export const sendPost = (submit) => {
    return (dispatch) => {
        dispatch(onAddPost(submit.post));
        dispatch(reset('myPosts'));
    }
}


const ADD_POST = 'soc-net-pjaw/profile-reducer/ADD-POST';
const SET_USER_PROFILE = 'soc-net-pjaw/profile-reducer/SET_USER_PROFILE';
const SET_STATUS = 'soc-net-pjaw/profile-reducer/SET_STATUS';
const DELETE_POST = 'soc-net-pjaw/profile-reducer/DELETE_POST';


//Action Creators
export const onAddPost = (message) => ({ type: ADD_POST, message })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })

export default profileReducer;