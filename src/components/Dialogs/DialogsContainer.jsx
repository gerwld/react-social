import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { dialogsAPI } from '../../api/api';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getFriendsTC, sendMessageToUser, setCurrentUserTC } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import s from './Dialogs.module.css';
import Message from './Message';


class DialogsContainer extends React.Component {

    constructor(props) {
        dialogsAPI.getDialogs();
        super(props);
    //load all users if state us. count is less than 1, then set user from url
        if(this.props.usersLength < 1){
            this.props.getFriendsTC();
        }
        setTimeout(() => this.props.setCurrentUserTC(this.props.match.params.userId), 600);
    }

    componentDidUpdate(prevProps) {
        let currentId = this.props.match.params.userId;
        if(prevProps.match.params.userId !== currentId) {
            this.props.setCurrentUserTC(currentId);
        }
    }

    onSendMessage = (data) => {
        let currentId = this.props.match.params.userId;
        this.props.sendMessageToUser(currentId, data.message);
    }

    render() {
        console.log("render");
        return (
            <Dialogs usersMap={this.props.usersMap}
                    idFromUrl={this.props.match.params.userId}
                    converListUser={this.props.converListUser}
                    currentDialog={this.props.currentDialog}
                    isMessagesLoaded={this.props.isMessagesLoaded}
                    onSendMessage={this.onSendMessage}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        usersMap: state.messagePage.dialogsData.map(user =>
            <li key={user.id}>
                <NavLink to={"/dialogs/id" + user.id} activeClassName={s.selected_item}>
                    <img src={user.avatar} alt={s.user_name}/><span className={s.user_name}>{user.name}</span>
                </NavLink>
            </li>),
        usersLength: state.messagePage.dialogsData.length,
        converListUser: state.messagePage.currentUser,
        isMessagesLoaded: state.messagePage.isMessagesLoaded,
        currentDialog: state.messagePage.messagesData.map(m => <Message {...m}/>)
    }
}



export default compose(
    connect(mapStateToProps, {getFriendsTC, setCurrentUserTC, sendMessageToUser}),
    withAuthRedirect,
    withRouter
)(DialogsContainer)