import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { findUsers, followUserThunkCreator, getPaginationCurrentIndexesTC, getUsersThunkCreator, loadFriendsToggle, onPageChangeThunkCreator } from '../../redux/users-reducer';
import { getCurrentPage, getIsFetching, getIsFollowing, getPages, getPageSize, getPagLengthWithCreateSelecor, getTotalUsers, getUsers } from '../../redux/users-selectors';
import Users from './Users';

class UsersAPIComponent extends React.Component {
    state = {
        searchInput: ''
    }

    getUsers = () => {
        this.props.getUsersThunkCreator(
            this.props.currentPage,
            this.props.pageSize,
            this.props.users.length,
            this.props.loadOnlyFriends,
            this.props.searchQuery);
    }

    componentDidMount() {
        this.getUsers();
    }

    onFriendsToggle = async () => {
        await this.props.loadFriendsToggle();
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
            this.props.pageSize,
            this.props.loadOnlyFriends,
            this.props.searchQuery
        );
    }

    onSearchChange = (e) => {
        this.setState({ searchInput: e.target.value });
    }
    onSearchSubmit = () => {
        let value = this.state.searchInput;
            this.props.loadFriendsToggle(false);
            this.props.findUsers(value);
            setTimeout(this.getUsers, 250)
    }

    showTitle = () => {
        let title = this.props.loadOnlyFriends ? "Friends" : "All Users";;
        let searchInput = this.props.searchQuery;
        let isSearching = searchInput.length >= 1;
        if(isSearching) {
            title = `Search result for: ${searchInput} `;
        }
        return title;
    }

    render() {
        return (
            <>
                <Users {...this.props}
                    followUser={this.props.followUserThunkCreator}
                    onPageChanged={this.onPageChanged}
                    getPagCurrentIndexes={this.getPagCurrentIndexes}
                    onFriendsToggle={this.onFriendsToggle}
                    isOnlyFriends={this.props.loadOnlyFriends}
                    searchInput={this.state.searchInput}
                    onSearchChange={this.onSearchChange}
                    onSearchSubmit={this.onSearchSubmit}
                    title={this.showTitle}
                    isFetching={this.props.isFetching}
                />

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
        loadOnlyFriends: state.usersPage.loadOnlyFriends,
        searchQuery: state.usersPage.searchQuery
    }
}

export default compose(
    connect(mapStateToProps, {
        getUsersThunkCreator, followUserThunkCreator,
        getPaginationCurrentIndexesTC, onPageChangeThunkCreator,
        loadFriendsToggle, findUsers}),
    withAuthRedirect,
    withRouter
)(UsersAPIComponent)