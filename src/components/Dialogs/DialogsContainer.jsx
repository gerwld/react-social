import s from './Dialogs.module.css';
import Message from './Message';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { dialogsTextActionCreator, sendMessageActionCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
    return {
        usersMap: state.messagePage.dialogsData.map(user =>
            <li key={user.id}><NavLink to={"/dialogs/id" + user.id} activeClassName={s.selected_item}><img src={`/images/avatars/avatar-${user.avaHash}.png`} />{user.name}</NavLink></li>),
        dialogMap: state.messagePage.messagesData.map(m =>
            <Message content={m.m} userdata={m.userdata} userid={m.userid} />)
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onInputValue: (e) => {
            let text = e.target.value;
            dispatch(dialogsTextActionCreator(text));
        },
        onSend: (e, textInput) => {
            e.preventDefault();
            dispatch(sendMessageActionCreator('0'));
            textInput.current.value = '';
        }  
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;