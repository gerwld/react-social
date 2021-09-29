import React from 'react';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { followUserThunkCreator, getPaginationCurrentIndexesTC, getUsersThunkCreator, loadFriendsToggle, onPageChangeThunkCreator } from '../../redux/users-reducer';
import { getCurrentPage, getIsFetching, getIsFollowing, getPages, getPageSize, getPagLengthWithCreateSelecor, getTotalUsers, getUsers } from '../../redux/users-selectors';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';

class UsersAPIComponent extends React.Component {

    getUsers = () => {
        this.props.getUsersThunkCreator(
            this.props.currentPage,
            this.props.pageSize,
            this.props.users.length,
            this.props.loadOnlyFriends);
    }

    componentDidMount() {
        this.getUsers();
    }


    onFriendsToggle = () => {
        this.props.loadFriendsToggle();
        this.getUsers();
    }

    getPagCurrentIndexes = () => {
        return this.props.getPaginationCurrentIndexesTC(
            this.props.currentPage,
            this.props.allPages,
            this.props.pagLength);
    }

    onPageChanged = (pageNumber) => {
        this.props.onPageChangeThunkCreator(
            pageNumber,
            this.props.allPages,
            this.props.pageSize);
    }

    render() {
        return (
            <>
                {this.props.isFetching && <Preloader />}
                {!this.props.isFetching && <Users {...this.props}
                    followUser={this.props.followUserThunkCreator}
                    onPageChanged={this.onPageChanged}
                    getPagCurrentIndexes={this.getPagCurrentIndexes}
                    onFriendsToggle={this.onFriendsToggle}
                    isOnlyFriends={this.props.loadOnlyFriends}
                     />}

            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowing: getIsFollowing(state),
        totalUsers: getTotalUsers(state),
        pageSize: getPageSize(state),
        allPages: getPages(state),
        pagLength: getPagLengthWithCreateSelecor(state),
        loadOnlyFriends: state.usersPage.loadOnlyFriends
    }
}

const UsersContainer = connect(mapStateToProps, {
    getUsersThunkCreator, followUserThunkCreator,
    getPaginationCurrentIndexesTC, onPageChangeThunkCreator,
    loadFriendsToggle
})(UsersAPIComponent);

export default withAuthRedirect(UsersContainer);