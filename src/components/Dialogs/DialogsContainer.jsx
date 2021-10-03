import React from 'react';
import { useRef } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getFriendsTC, messagesInitialized, sendMessageToUser, setCurrentUserTC, loadMoreMessages } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import s from './Dialogs.module.css';


class DialogsContainer extends React.Component {

    constructor(props) {
        super(props);
        //sometimes buggy, better use full path
        this.currentId = this.props.match.params.userId;
        this.endDialogBlock = React.createRef();
        this.state = {
            currentPage: 2
        }
        this.getFriendsAndSetCurrentUser();
    }

    getFriendsAndSetCurrentUser = async () => {
         //load all users if state usr. count is less than 1, then set user from url
        if (this.props.usersLength < 1) {
            await this.props.getFriendsTC();
        } 
        this.props.setCurrentUserTC(this.props.match.params.userId);
    }

    componentDidUpdate(prevProps) {
        let currentId = this.props.match.params.userId;
        if (prevProps.match.params.userId !== currentId) {
            this.props.messagesInitialized(false);
            this.setState({ currentPage: 2 });
            this.props.setCurrentUserTC(currentId);
        }
    }

    onSendMessage = (data) => {
        let currentId = this.props.match.params.userId;
        this.props.sendMessageToUser(currentId, data.message);
        setTimeout(() => this.scrollToBottom(this.endDialogBlock.current), 500);
    }

    getConversation = () => {
        let currPage = this.state.currentPage;
        let currentId = this.props.match.params.userId;
        this.props.loadMoreMessages(currentId, currPage);
        this.setState({ currentPage: currPage + 1 });
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
                onSendMessage={this.onSendMessage}
                dialogsLoader={this.getConversation}
                dialogsWindow={this.myRef}
                onScroll={this.onScroll}
                totalMessCount={this.props.totalMessCount}
                currentPage={this.state.currentPage}
                endDialogBlock={this.endDialogBlock} />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        usersMap: state.messagePage.dialogsData.map(user =>
            <li key={user.id}>
                <NavLink to={"/dialogs/id" + user.id} activeClassName={s.selected_item}>
                    <img src={user.avatar} alt={s.user_name} /><span className={s.user_name}>{user.name}</span>
                </NavLink>
            </li>),
        usersLength: state.messagePage.dialogsData.length,
        converListUser: state.messagePage.currentUser,
        isMessagesLoaded: state.messagePage.isMessagesLoaded,
        currentDialog: state.messagePage.messagesData,
        totalMessCount: state.messagePage.totalMessCount,
        loadedUsers: state.messagePage.dialogsData
    }
}



export default compose(
    connect(mapStateToProps, { getFriendsTC, setCurrentUserTC, sendMessageToUser, messagesInitialized, loadMoreMessages }),
    withAuthRedirect,
    withRouter
)(DialogsContainer)