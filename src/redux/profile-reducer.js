import { reset } from 'redux-form';
import { profileAPI } from "../api/api";

const ADD_POST = 'soc-net-pjaw/profile-reducer/ADD-POST';
const SET_USER_PROFILE = 'soc-net-pjaw/profile-reducer/SET_USER_PROFILE';
const SET_STATUS = 'soc-net-pjaw/profile-reducer/SET_STATUS';
const DELETE_POST = 'soc-net-pjaw/profile-reducer/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'soc-net-pjaw/profile-reducer/SAVE_PHOTO_SUCCESS';
const SET_AUTH_USER = 'soc-net-pjaw/dialogs-reducer/SET_AUTH_USER';


export const onAddPost = (message) => ({ type: ADD_POST, message })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos })
export const setAuthUser = (profile) => ({ type: SET_AUTH_USER, profile });

let initialState = {
    postData: [
        { postId: "123", publishedAt: '2006-9-4T17:09:15Z', cont: "That site is so cool!", likes: 9 },
        {
            postId: '2007-10-17T13:06:15Z',
            publishedAt: '2007-10-17T13:06:15Z',
            cont: "Hi there!! 2015 is rock!",
            likes: 23,
            urlToImage: '/images/post-photo-2.jpg'
        },
        { postId: 2, publishedAt: '2012-10-17T13:06:15Z', cont: "Deez nuts... Today everything is fine, just vibing with my famity🙃 #coolday", likes: 28 },
    ],
    profile: null,
    authProfile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                postData: [...state.postData,
                action.message],
                newPostText: ""
            };

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_AUTH_USER: {
            return {
                ...state,
                authProfile: action.profile
            }
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
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos }
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
        if (status.status === 200) {
            dispatch(setStatus(status.data));
        } else alert(`Network error ${status.status || 1}. If it happened frequently please let us know.`);

        let user = await profileAPI.getUser(userId);
        dispatch(setUserProfile(user));
    }
}


export const getAuthUserData = (authId) => {
    return async (dispatch) => {
        let user = await profileAPI.getUser(authId);
        dispatch(setAuthUser(user));
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

export const setCurrentSettingsTC = (data) => {
    return async (dispatch, getState) => {
        let authId = await getState().auth.userId;
        let dataNew = await {
            ...data, "fullName": `${data.name} ${data.surname}`,
            "aboutMe": (data.aboutMe || "FrontEnd Developer"), "lookingForAJob": data.lookingForAJob,
            "lookingForAJobDescription": (data.lookingForAJobDescription || "Empty"), "userId": authId
        }
        delete dataNew.name; delete dataNew.surname;

        let response = await profileAPI.setUserSettings(dataNew);
        if (response.data.resultCode === 0) {
            dispatch(getUserInfo(authId));
            alert('Settings saved.');
        }
        if (response.data.messages.length > 0) {
            response.data.messages.map(mess => alert(mess));
        }
    }
}

export const setUserAvatar = (photo) => {
    return async (dispatch) => {
        let response = await profileAPI.setUserAvatar(photo);
        let result = response.resultCode;
        if (result === 0) {
            await dispatch(savePhotoSuccess(response.data.photos));
            alert('Avatar is successfully uploaded.');
        } else if (result) {
            alert(`Server error ${result || 0}. ${'You send too many requests' || response.messages[0]}.`);
        } else { setTimeout(() => alert('Please check your internet connection and try again.', 15000)); }
    }
}

export const sendPost = (post) => {
    return (dispatch) => {
        let data = moment().format("MMM Do, hh:mm a");
        let isEmpty = !post.postData || post.postData.length < 1;
        if (!isEmpty) {
            let postObj = {
                postId: moment() + '_postId',
                publishedAt: data,
                cont: post.postData,
                likes: 0
            }
            dispatch(onAddPost(postObj));
            dispatch(reset('myPosts'));
        } 
        else alert("Your message is empty, or you provided incorrect data.");
    }
}

export default profileReducer;