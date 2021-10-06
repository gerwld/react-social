import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getFriendsTC, messagesInitialized, sendMessageToUser, setCurrentUserTC, getConverstaionWithUser, usersInitialized } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import s from './Dialogs.module.css';


class DialogsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.endDialogBlock = React.createRef();
        this.state = {
            currentPage: 2,

        }
        this.getFriendsAndSetCurrentUser();
    }

    componentDidUpdate(prevProps) {
        let currentId = this.props.match.params.userId;
        if (prevProps.match.params.userId !== currentId) {
            this.props.messagesInitialized(false);
            this.setState({ currentPage: 2 });
            this.props.setCurrentUserTC(currentId, this.props.loadedUsers);
        }
    }

    getFriendsAndSetCurrentUser = async () => {
         //Gets all users when state is empty, then gets current user from state / api
        if (this.props.usersLength < 1) {
           await this.props.getFriendsTC();
           this.props.usersInitialized(true);
        } 
        this.props.setCurrentUserTC(this.props.match.params.userId, this.props.loadedUsers);
    }

    getConversation = () => {
        let currPage = this.state.currentPage;
        let currentId = this.props.match.params.userId;
        this.props.getConverstaionWithUser(currentId, currPage, false);
        this.setState({ currentPage: currPage + 1 });
    }

    onSendMessage = async (data) => {
        let currentId = this.props.match.params.userId;
        await this.props.sendMessageToUser(currentId, data.message);
        this.scrollToBottom(this.endDialogBlock.current);
    }

    scrollToBottom = (refCurrent) => {
        if (refCurrent) {
            refCurrent.scrollIntoView({ behavior: "smooth" });
        }
    };

    render() {
        return (
            <Dialogs usersMap={this.props.usersMap}
                idFromUrl={this.props.match.params.userId}
                converListUser={this.props.converListUser}
                currentDialog={this.props.currentDialog}
                isMessagesLoaded={this.props.isMessagesLoaded}
                isUsersLoaded={this.props.isUsersLoaded}
                onSendMessage={this.onSendMessage}
                dialogsLoader={this.getConversation}
                totalMessCount={this.props.totalMessCount}
                currentPage={this.state.currentPage}
                endDialogBlock={this.endDialogBlock}
                 />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        usersMap: state.messagePage.dialogsData.map(user =>
            <li key={user.id}>
                <NavLink to={"/dialogs/id" + user.id} activeClassName={s.selected_item}>
                    <img src={user.avatar} className={s.userlist_avatar} alt={s.user_name} /><span className={s.user_name}>{user.name}</span>
                </NavLink>
            </li>),
        usersLength: state.messagePage.dialogsData.length,
        converListUser: state.messagePage.currentUser,
        isMessagesLoaded: state.messagePage.isMessagesLoaded,
        isUsersLoaded: state.messagePage.isUsersLoaded,
        currentDialog: state.messagePage.messagesData,
        totalMessCount: state.messagePage.totalMessCount,
        loadedUsers: state.messagePage.dialogsData
    }
}



export default compose(
    connect(mapStateToProps, { getFriendsTC, setCurrentUserTC, sendMessageToUser, messagesInitialized, getConverstaionWithUser, usersInitialized }),
    withAuthRedirect,
    withRouter
)(DialogsContainer)