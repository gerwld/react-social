import { reset } from 'redux-form';
import { setUserProfile } from './profile-reducer';

const SEND_MESSAGE = 'SEND-MESSAGE';


//Action Creators
export const onSend = (message, userID, userdata, avatar) => ({ type: SEND_MESSAGE, message, userID, userdata, avatar });

let initialState = {
    dialogsData: [
        { id: "0", name: "Andrew K", avaHash: 'm1' },
        { id: "1", name: "Anton B", avaHash: '2' },
        { id: "2", name: "Richard M", avaHash: 'm6' },
        { id: "3", name: "Sergey K", avaHash: 'm4' },
        { id: "4", name: "Patrick J", avaHash: 'm5' },
        { id: "5", name: "Evgenii K", avaHash: 'm6' },
        { id: "6", name: "Somebody O", avaHash: 'm7' },
        { id: "7", name: "Anastasia I", avaHash: 'f8' },
        { id: "8", name: "Svetlana W", avaHash: 'f9' },
        { id: "9", name: "Andrew K", avaHash: 'm10' },
        { id: "10", name: "Cordie F", avaHash: 'f11' },
        { id: "11", name: "Robbie M", avaHash: 'm12' },
        { id: "12", name: "Maxime B", avaHash: 'f12' },
        { id: "13", name: "Valentine R", avaHash: 'f13' },
        { id: "14", name: "Linda L", avaHash: 'f14' },
        { id: "19461", name: "Patryk J", avaHash: 'f14' }
    ],
    messagesData: [
        { m: "Hi there", userdata: "Anton B", userid: "1", avatar: "/images/avatars/avatar-2.png" },
        { m: "Hi", userid: "0" },
        { m: "How are you?", userdata: "Anton B", userid: "1", avatar: "/images/avatars/avatar-2.png" },
        { m: "I'm ok. Do you played in a new Witcher?", userid: "0" },
        { m: "Oh yeah. It's so cool.", userdata: "Anton B", userid: "1", avatar: "/images/avatars/avatar-2.png" },
        { m: "And grapics is just unbeliveble! Cant imagine that CD's do that", userdata: "Anton B", userid: "1", avatar: "/images/avatars/avatar-2.png" },
        { m: "Right.", userid: "0" },
        { m: "I'm playing in it for like ~30 hours without even one break.", userid: "0" },
        { m: "And i guess its the best game i've ever seen", userid: "0" },
    ],
    newMessageText: ''
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            var message = action.message;
            if (message !== '' && message !== '\n' && message !== '\n\n') {
                return {
                    ...state,
                    messagesData: [...state.messagesData,
                    { m: message, userid: action.userID, userdata: action.userdata, avatar: action.avatar }],
                    newMessageText: ''
                }
            }
        }
        default:
            return state;
    }
}

export const onSendTC = (message) => {
    return (dispatch, getState) => {
        // TODO:
        if (getState().profilePage.profile == null) {
            debugger;
            dispatch(setUserProfile)
        }
        // console.log(getState().profilePage);
        if (message !== "" && message) {
            dispatch(onSend(message,
                getState().profilePage.authUserId,
                getState().profilePage.profile.fullName,
                getState().profilePage.profile.photos.large));
            dispatch(reset('dialogsForm'));
        }
    }

}



export default dialogsReducer;