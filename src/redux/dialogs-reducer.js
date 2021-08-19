const NEW_MESSAGE_STATE = 'NEW-MESSAGE-STATE';
const SEND_MESSAGE = 'SEND-MESSAGE';

// way to  this._state.messagePage

const dialogsReducer = (state, action) => {
    if (action.type === 'NEW-MESSAGE-STATE') {
        state.newMessageText = action.currentValue;
    }
    else if (action.type = 'SEND-MESSAGE') {
        let message = state.newMessageText;
        if (message !== '' && message !== '\n' && message !== '\n\n') {
            let allDialog = state.messagesData;
            let newMessage = { m: message, userid: action.userID }
            allDialog.push(newMessage);
            state.newMessageText = '';
        }
    }
    return state;
}

export default dialogsReducer;