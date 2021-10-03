import { reset } from 'redux-form';
import { dialogsAPI, profileAPI } from '../api/api';

const SET_FRIENDS = 'SET_FRIENDS';
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const GET_CONVERSATION = 'GET_CONVERSATION';
const MESS_INITIALIZED = 'MESS_INITIALIZED';
const ADD_MESSAGE = 'ADD_MESSAGE';
const LOAD_MORE_MESSAGES = 'LOAD_MORE_MESSAGES';


//Action Creators
export const setFriends = (users) => ({ type: SET_FRIENDS, users });
export const setCurrentUser = (id, name, avatar) => ({ type: SET_CURRENT_USER, data: { id, name, avatar } });
export const setConversationWithUser = (messages, messCount) => ({ type: GET_CONVERSATION, messages, messCount });
export const messagesInitialized = (boolean) => ({ type: MESS_INITIALIZED, boolean });
export const addMessage = (message) => ({ type: ADD_MESSAGE, message });
export const loadMoreMessagesAC = (messages, messCount) => ({ type: LOAD_MORE_MESSAGES, messages, messCount });


let initialState = {
    dialogsData: [
        // { id: "0", name: "Andrew K", avatar: 'm1' }
    ],
    messagesData: [
    {
        addedAt: "2021-10-01T11:51:37.15",
        body: "415 база ответьте",
        id: "5593ac05-bfb9-465c-9f66-2026492ef08d",
        recipientId: 19907,
        senderId: 19461,
        senderName: "gerwld",
        translatedBody: null,
        viewed: false
    }],
    isMessagesLoaded: false,
    currentUser: '',
    totalMessCount: 0
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
        case GET_CONVERSATION: {
            return {
                ...state,
                messagesData: action.messages,
                totalMessCount: action.messCount
            }
        }
        case LOAD_MORE_MESSAGES: {
            return {
                ...state,
                messagesData: [...state.messagesData, ...action.messages],
                totalMessCount: action.messCount
            }
        }
        case ADD_MESSAGE: {
            return {
                ...state,
                messagesData: [action.message, ...state.messagesData]
            }
        }
        case MESS_INITIALIZED: {
            return {
                ...state,
                isMessagesLoaded: action.boolean
            }
        }

        default:
            return state;
    }
}

export const getFriendsTC = () => {
    return async (dispatch) => {
    //get all interlocutor's, then map it to state
    let response = await dialogsAPI.getDialogs();
            let users = response.map(r => ({
                id: r.id,
                name: r.userName,
                avatar: (r.photos.small !== null) ? r.photos.small : '/images/avatars/def-avatar.png'
            }));
            dispatch(setFriends(users));
    }
}

export const setCurrentUserTC = (idFromUrl) => {
    //find user from state users, if it not there - get user and put it first in array
    return (dispatch, getState) => {
        let checkFromState = getState().messagePage.dialogsData.filter(r => r.id === parseInt(idFromUrl, 10));
        if (checkFromState.length === 1) {
            dispatch(setCurrentUser(idFromUrl, checkFromState[0].name, checkFromState[0].avatar));
        } 
        else if (idFromUrl) {
            profileAPI.getUser(idFromUrl).then(r => {
                dispatch(setCurrentUser(idFromUrl, r.data.fullName, r.data.photos.small));
                dispatch(setFriends([{id: parseInt(idFromUrl, 10), name: r.data.fullName, avatar: (r.data.photos.small || '/images/avatars/def-avatar.png')}]));
            });
        }

        dispatch(getConverstaionWithUser(idFromUrl));
    }
}

export const getConverstaionWithUser = (idFromUrl) => {
    return (dispatch) => {
        dispatch(messagesInitialized(false));
        if(idFromUrl){
        dialogsAPI.getDialogWithUser(idFromUrl).then(response => {
            let dialogMessages = response.items.reverse(r => r);
            let totalMessCount = response.totalCount;
            dispatch(setConversationWithUser(dialogMessages, totalMessCount));
            dispatch(messagesInitialized(true));
        })}
    }
}

export const loadMoreMessages = (idFromUrl, page) => {
    return (dispatch) => {
        if(idFromUrl){
        dialogsAPI.getDialogWithUser(idFromUrl, page).then(response => {
            let dialogMessages = response.items.reverse(r => r);
            let totalMessCount = response.totalCount;
            dispatch(loadMoreMessagesAC(dialogMessages, totalMessCount));
        })}
    }
}

export const sendMessageToUser = (idFromUrl, message) => {
    return (dispatch) => {
        if(message && message.length >= 1) {
            dialogsAPI.sendMessageToUser(idFromUrl, message).then(r => {
                if(r.resultCode === 0) {
                    let messageObj = r.data.message;
                    dispatch(addMessage(messageObj));
                    dispatch(reset('dialogsForm'));
                }
            })
        }
    }
}




export default dialogsReducer;