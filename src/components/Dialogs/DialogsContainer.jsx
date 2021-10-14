import moment from 'moment';
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
            currentPage: 2
        }
        //Set initialization to false if user back to messages from another page
        this.props.usersInitialized(false);
        this.props.messagesInitialized(false);

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
        }
        await this.props.setCurrentUserTC(this.props.match.params.userId, this.props.loadedUsers);
        await this.props.usersInitialized(true);
    }

    getConversation = () => {
        let currPage = this.state.currentPage;
        let currentId = this.props.match.params.userId;
        this.props.getConverstaionWithUser(currentId, currPage, false);
        this.setState({ currentPage: currPage + 1 });
    }

    getLastTimeOrShowOnline = (value, showOnlyIfOnline) => {
        var lastOnline = moment.utc(value, 'YYYY-MM-DD[T]hh:mm:ss.Z').utcOffset(120).startOf('minutes').fromNow();
        var lastOnlineSplit = lastOnline.split(" ");
        var isShowOnline = ((lastOnlineSplit[0] < 15) && lastOnlineSplit[1].startsWith('minut')) || (lastOnlineSplit[0].startsWith('a') && lastOnlineSplit[1].startsWith('min')) || lastOnlineSplit[1].startsWith('few');
        if(isShowOnline) {
            return <span className={s.online}>Online</span>
        } else if(!showOnlyIfOnline) {
            return <>Last seen {lastOnline}</>
        }
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
            <Dialogs loadedUsers={this.props.loadedUsers}
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
                getLastTimeOrShowOnline={this.getLastTimeOrShowOnline}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
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