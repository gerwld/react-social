import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { unfollowUser, setUsers, countOfUsers, setPage, toggleIsFetching} from '../../redux/users-reducer';
import { usersAPI } from '../../api/api';

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
        if (!user.followed) {
            usersAPI.followUserRequest(user.id).then(r => {
                r.resultCode === 0 && this.props.unfollowUser(user.id);
            })
        } else {
            usersAPI.unfollowUserRequest(user.id).then(r => {
                r.resultCode === 0 && this.props.unfollowUser(user.id);
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
                getPages={this.getPages} />}
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
        isFetching: state.usersPage.isFetching
    }
}


const UsersContainer = connect(mapStateToProps, {unfollowUser, setUsers, countOfUsers, setPage, toggleIsFetching})(UsersAPIComponent);

export default UsersContainer;