const NEW_MESSAGE_STATE = 'NEW-MESSAGE-STATE';
const SEND_MESSAGE = 'SEND-MESSAGE';


//Action Creators
export const dialogsTextActionCreator = (value) => ({ type: NEW_MESSAGE_STATE, currentValue: value });
export const sendMessageActionCreator = (userID) => ({ type: SEND_MESSAGE, userID: userID });

let initialState = {
    dialogsData: [
        { id: "0", name: "Andrew K" },
        { id: "1", name: "Anton B" },
        { id: "2", name: "Richard M" },
        { id: "3", name: "Sergey K" },
        { id: "4", name: "Patrick J" },
        { id: "5", name: "Evgenii K" },
        { id: "6", name: "Somebody O" },
        { id: "7", name: "Anastasia I" },
        { id: "8", name: "Svetlana W" },
        { id: "9", name: "Andrew K" },
        { id: "10", name: "Andrew K" }
    ],
    messagesData: [
        { m: "Hi there", userdata: "Anton B", userid: "1" },
        { m: "Hi", userid: "0" },
        { m: "How are you?", userdata: "Anton B", userid: "1" },
        { m: "I'm ok. Do you played in a new Witcher?", userid: "0" },
        { m: "Oh yeah. It's so cool.", userdata: "Anton B", userid: "1" },
        { m: "And grapics is just unbeliveble! Cant imagine that CD's do that", userdata: "Anton B", userid: "1" },
        { m: "Right.", userid: "0" },
        { m: "I'm playing in it for like ~30 hours without even one break.", userid: "0" },
        { m: "And i guess its the best game i've ever seen", userid: "0" },
    ],
    newMessageText: ''
}

const dialogsReducer = (state = initialState, action) => {
    switch(action.type) {
        case NEW_MESSAGE_STATE: 
            state.newMessageText = action.currentValue;
            return state;
        case SEND_MESSAGE:
            let message = state.newMessageText;
            if (message !== '' && message !== '\n' && message !== '\n\n') {
                let allDialog = state.messagesData;
                let newMessage = { m: message, userid: action.userID }
                allDialog.push(newMessage);
                state.newMessageText = '';
            } 
            return state;
        default:
            return state;

    }
}

export default dialogsReducer;