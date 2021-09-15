import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import s from './Dialogs.module.css';
import Message from './Message';
import Dialogs from './Dialogs';
import { onInputValue, onSendTC } from '../../redux/dialogs-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


let mapStateToProps = (state) => {
    return {
        usersMap: state.messagePage.dialogsData.map(user =>
            <li key={user.id}>
                <NavLink to={"/dialogs/id" + user.id} activeClassName={s.selected_item}>
                    <img src={`/images/avatars/avatar-${user.avaHash}.png`} />{user.name}
                </NavLink>
            </li>),
        dialogMap: state.messagePage.messagesData.map(m =>
            <Message content={m.m} userdata={m.userdata} userid={m.userid} avatar={m.avatar} />)
    }
}



const DialogsContainer = connect(mapStateToProps, {onInputValue, onSendTC})(Dialogs);

export default withAuthRedirect(DialogsContainer);