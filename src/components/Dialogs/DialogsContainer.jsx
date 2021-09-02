import s from './Dialogs.module.css';
import Message from './Message';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { dialogsTextActionCreator, sendMessageActionCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import StoreContext from '../../StoreContext';


const DialogsContainer = (props) => {
    return (
        <StoreContext.Consumer>
            {(store) => {
                let state = store.getState();
                // маппинг даты со стейта в компоненты
                let dialogItems = state.messagePage.dialogsData.map(user =>
                    <li key="1"><NavLink to={"/dialogs/id" + user.id} activeClassName={s.selected_item}>{user.name}</NavLink></li>);
                let messageItems = state.messagePage.messagesData.map(m =>
                    <Message content={m.m} userdata={m.userdata} userid={m.userid} />);

                let newMessageState = (e) => {
                    let text = e.target.value;
                    store.dispatch(dialogsTextActionCreator(text));
                };

                let sendMessage = (e, textInput) => {
                    e.preventDefault();
                    store.dispatch(sendMessageActionCreator('0'));
                    textInput.current.value = '';
                };

                return (<Dialogs onInputValue={newMessageState} onSend={sendMessage} usersMap={dialogItems} dialogMap={messageItems} />)
            }
            }
        </StoreContext.Consumer>
    );
};

export default DialogsContainer;