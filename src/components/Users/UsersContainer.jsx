import React from 'react';
import { connect } from 'react-redux';
import { usersAPI } from '../../api/api';
import { countOfUsers, setPage, setUsers, toggleIsFetching, toggleIsFollowing, unfollowUser } from '../../redux/users-reducer';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';

class UsersAPIComponent extends React.Component {

    componentDidMount() {
        if (this.props.users.length < this.props.pageSize) {
            this.props.toggleIsFetching(true);
            usersAPI.getUsers(this.props.pageSize, this.props.currentPage).then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.countOfUsers(data.totalCount);
            });
        }
    }

    onPageChanged = (pageNumber) => {
        this.props.setPage(pageNumber);
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(this.props.pageSize, pageNumber).then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);
        });
    }

    followUser = (user) => {
        this.props.toggleIsFollowing(true, user.id);
        if (!user.followed) {
            usersAPI.followUserRequest(user.id).then(r => {
                r.resultCode === 0 && this.props.unfollowUser(user.id);
                this.props.toggleIsFollowing(false, user.id);
            })
        } else {
            usersAPI.unfollowUserRequest(user.id).then(r => {
                r.resultCode === 0 && this.props.unfollowUser(user.id);
                this.props.toggleIsFollowing(false, user.id);
            })
        }

    }

    getPages = () => {
        let pagesCount = Math.ceil(this.props.totalUsers / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
        return pages;
    }

    render() {
        return (
            <>
            {this.props.isFetching && <Preloader />}
            {!this.props.isFetching && <Users totalUsers={this.props.totalUsers}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                followUser={this.followUser}
                getPages={this.getPages}
                isFollowing={this.props.isFollowing} />}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        totalUsers: state.usersPage.totalUsers,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowing: state.usersPage.isFollowing
    }
}

const UsersContainer = connect(mapStateToProps, {unfollowUser, setUsers, countOfUsers, setPage, toggleIsFetching, toggleIsFollowing})(UsersAPIComponent);

export default UsersContainer;