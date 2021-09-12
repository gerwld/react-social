import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import s from './Dialogs.module.css';
import Message from './Message';
import Dialogs from './Dialogs';
import { onInputValue, onSend } from '../../redux/dialogs-reducer';


let mapStateToProps = (state) => {
    return {
        usersMap: state.messagePage.dialogsData.map(user =>
            <li key={user.id}>
                <NavLink to={"/dialogs/id" + user.id} activeClassName={s.selected_item}>
                    <img src={`/images/avatars/avatar-${user.avaHash}.png`} />{user.name}
                </NavLink>
            </li>),
        dialogMap: state.messagePage.messagesData.map(m =>
            <Message content={m.m} userdata={m.userdata} userid={m.userid} />)
    }
}

const DialogsContainer = connect(mapStateToProps, {onInputValue, onSend})(Dialogs);

export default DialogsContainer;