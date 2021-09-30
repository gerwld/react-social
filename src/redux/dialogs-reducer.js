import { reset } from 'redux-form';
import { profileAPI, usersAPI } from '../api/api';

const SET_FRIENDS = 'SET_FRIENDS';
const SET_CURRENT_USER = 'SET_CURRENT_USER';


//Action Creators
export const setFriends = (users) => ({ type: SET_FRIENDS, users });
export const setCurrentUser = (id, name, avatar) => ({ type: SET_CURRENT_USER, data: { id, name, avatar } });


let initialState = {
    dialogsData: [
        // { id: "0", name: "Andrew K", avatar: 'm1' }
    ],
    messagesData: [
        // { m: "Hi there", userdata: "Anton B", userid: "1", avatar: "/images/avatars/avatar-2.png" }
    ],
    currentUser: ''
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FRIENDS: {
            return {
                ...state,
                dialogsData: [...action.users, ...state.dialogsData]
            }
        }
        case SET_CURRENT_USER: {
            return {
                ...state,
                currentUser: action.data
            }
        }

        default:
            return state;
    }
}

export const onSendTC = (message) => {
    return (dispatch) => {
       
    }
}

export const getFriendsTC = () => {
    return (dispatch) => {
//get users(friends) portion, then map it to state
        usersAPI.getAllFriends().then(response => {
            let users = response.map(r => ({
                id: r.id,
                name: r.name,
                avatar: (r.photos.small !== null) ? r.photos.small : '/images/avatars/def-avatar.png'
            }));
            dispatch(setFriends(users));
        });
    }
}

export const setCurrentUserTC = (idFromUrl, authId) => {
    return (dispatch, getState) => {
//find user from state users, if it not there - get user and put it first in array
        let checkFromState = getState().messagePage.dialogsData.filter(r => r.id === parseInt(idFromUrl, 10));
        if (checkFromState.length === 1) {
            dispatch(setCurrentUser(idFromUrl, checkFromState[0].name, checkFromState[0].avatar));
        } 
        else {
            profileAPI.getUser(idFromUrl).then(r => {
                dispatch(setCurrentUser(idFromUrl, r.data.fullName, r.data.photos.small));
                dispatch(setFriends([{id: parseInt(idFromUrl, 10), name: r.data.fullName, avatar: (r.data.photos.small || '/images/avatars/def-avatar.png')}]));
            });
        }
    }
}



export default dialogsReducer;