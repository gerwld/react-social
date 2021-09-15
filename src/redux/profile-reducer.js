import { profileAPI, usersAPI } from "../api/api";

let initialState = {
    postData: [
        { id: 2, likes: 999 },
        { id: 1, cont: "Deez nuts... Today everything is fine, just vibing with my famity #coolday", likes: 28 },
        { id: 0, cont: "Hi there!! 2007 is rock!", likes: 23 }
    ],
    newPostText: "",
    profile: null,
    authUserId: 19461,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                postData: [...state.postData,
                { id: state.postData.length, cont: state.newPostText, likes: 0 }],
                newPostText: ""
            };

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
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

export const getUserInfo = (userId, authUserId) => {
    return (dispatch) => {
        let id = userId ? userId : authUserId;
        dispatch(setUserProfile(null));
        usersAPI.getUser(id).then(r => {
            dispatch(setUserProfile(r.data));
        });
        profileAPI.getStatus(authUserId).then(r => {
            dispatch(setStatus(r.data));
        });
    }
}

export const setUserStatus = (status) => {
    return (dispatch) => {
        profileAPI.setStatus(status).then(r => {
            if(r.data.resultCode === 0) {
            dispatch(setStatus(status));
            }
        });
    }
}


const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';


//Action Creators
export const onInputValue = (newText) => ({ type: UPDATE_NEW_POST_TEXT, newText: newText });
export const onAddPost = () => ({ type: ADD_POST })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })

export default profileReducer;