import { reset } from 'redux-form';
import { dialogsAPI, profileAPI } from '../api/api';

const SET_FRIENDS = 'soc-net-pjaw/dialogs-reducer/SET_FRIENDS';
const SET_CURRENT_USER = 'soc-net-pjaw/dialogs-reducer/SET_CURRENT_USER';
const GET_CONVERSATION = 'soc-net-pjaw/dialogs-reducer/GET_CONVERSATION';
const MESS_INITIALIZED = 'soc-net-pjaw/dialogs-reducer/MESS_INITIALIZED';
const ADD_MESSAGE = 'soc-net-pjaw/dialogs-reducer/ADD_MESSAGE';
const LOAD_MORE_MESSAGES = 'soc-net-pjaw/dialogs-reducer/LOAD_MORE_MESSAGES';
const USERS_INITIALIZED = 'soc-net-pjaw/dialogs-reducer/USERS_INITIALIZED';

export const setFriends = (users) => ({ type: SET_FRIENDS, users });
export const setCurrentUser = (id, name, avatar, lastUserActivityDate) => ({ type: SET_CURRENT_USER, data: { id, name, avatar, lastUserActivityDate } });
export const setConversationWithUser = (messages, messCount) => ({ type: GET_CONVERSATION, messages, messCount });
export const messagesInitialized = (boolean) => ({ type: MESS_INITIALIZED, boolean });
export const usersInitialized = (boolean) => ({ type: USERS_INITIALIZED, boolean });
export const addMessage = (message) => ({ type: ADD_MESSAGE, message });
export const loadMoreMessagesAC = (messages, messCount) => ({ type: LOAD_MORE_MESSAGES, messages, messCount });


let initialState = {
    dialogsData: [
        // {
        // id: 24,
        // name: 'NataFiona',
        // avatar: 'https://social-network.samuraijs.com/activecontent/images/users/24/user-small.jpg?v=1'
        // },
        // {
        // id: 22,
        // name: 'nataladanilcenko',
        // avatar: 'https://social-network.samuraijs.com/activecontent/images/users/22/user-small.jpg?v=1'
        // }
    ],
    messagesData: [
        {
            addedAt: "2021-10-01T11:51:37.15",
            body: "message text",
            id: "5593ac05-bfb9-465c-9f66-2026492ef08d",
            recipientId: 19907,
            senderId: 19461,
            senderName: "gerwld",
            translatedBody: null,
            viewed: false
        }],
    isMessagesLoaded: false,
    isUsersLoaded: false,
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
        case USERS_INITIALIZED: {
            return {
                ...state,
                isUsersLoaded: action.boolean
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
            avatar: (r.photos.small !== null) ? r.photos.small : '/images/avatars/def-avatar.png',
            lastUserActivityDate: r.lastUserActivityDate,
            hasNewMessages: r.hasNewMessages,
            newMessagesCount: r.newMessagesCount
        }));
        dispatch(setFriends(users));
    }
}

export const setCurrentUserTC = (idFromUrl, usersFromState) => {
    //find user from state users, if it not there - get user and put it first in array
    return async (dispatch) => {
        let checkFromState = await usersFromState.filter(r => r.id === parseInt(idFromUrl, 10));
        if (checkFromState.length === 1) {
            dispatch(setCurrentUser(idFromUrl, checkFromState[0].name, checkFromState[0].avatar, checkFromState[0].lastUserActivityDate));
        }
        else if (idFromUrl) {
            let r = await profileAPI.getUser(idFromUrl);
            dispatch(setCurrentUser(idFromUrl, r.fullName, r.photos.small));
            dispatch(setFriends([{ id: parseInt(idFromUrl, 10), name: r.fullName, avatar: (r.photos.small || '/images/avatars/def-avatar.png') }]));

        }

        dispatch(getConverstaionWithUser(idFromUrl, 1, true));
    }
}

export const getConverstaionWithUser = (idFromUrl, page = 1, isInitialLoad) => {
    return async (dispatch) => {
        if (idFromUrl && idFromUrl > 0) {
            let response = await dialogsAPI.getDialogWithUser(idFromUrl, page);
            let dialogMessages = response.items.reverse();
            if (isInitialLoad) {
                await dispatch(messagesInitialized(false)); //load screen, re-render component when toggle
                await dispatch(setConversationWithUser(dialogMessages, response.totalCount));
                dispatch(messagesInitialized(true));
            } else {
                await dispatch(loadMoreMessagesAC(dialogMessages, response.totalCount));
            }
        }
    }
}


export const sendMessageToUser = (idFromUrl, message) => {
    return async (dispatch) => {
        if (idFromUrl && message && message.length >= 1) {
            let r = await dialogsAPI.sendMessageToUser(idFromUrl, message);
            if (r.resultCode === 0) {
                dispatch(addMessage(r.data.message));
                dispatch(reset('dialogsForm'));
            } else if (r.resultCode === 1){
                   return alert("You have sent too many messages. Your account is temporarily blocked.");
            } else {
                r.messages.map(r => {
                   return alert(r);
                })
            }
        }
    }
}


export default dialogsReducer;