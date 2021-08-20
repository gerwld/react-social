import s from './Dialogs.module.css';
import Message from './Message';
import { NavLink } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import { dialogsTextActionCreator, sendMessageActionCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';


const DialogsContainer = (props) => {

    let state = props.store.getState();

    // маппинг даты со стейта в компоненты
    let dialogItems = state.messagePage.dialogsData.map(user => 
        <li key="1"><NavLink to={"/dialogs/id" + user.id} activeClassName={s.selected_item}>{user.name}</NavLink></li>);
    let messageItems = state.messagePage.messagesData.map(m => 
        <Message content={m.m} userdata={m.userdata} userid={m.userid} />);

    let newMessageState = (e) => {
        let text = e.target.value;
        props.dispatch(dialogsTextActionCreator(text));
    };

    let sendMessage = (e, textInput) => {
        e.preventDefault();
        props.dispatch(sendMessageActionCreator('0'));
        textInput.current.value = '';
    };

    return (
        <Dialogs onInputValue={newMessageState} onSend={sendMessage} usersMap={dialogItems} dialogMap={messageItems}/>
    );
};

export default DialogsContainer;