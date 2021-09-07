import React from 'react';
import { connect } from 'react-redux';
import { setPageAC, setUsersAC, totalCountAC, unfollowAC } from '../../redux/users-reducer';
import Users from './UsersClass';

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        totalUsers: state.usersPage.totalUsers,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        unfollowUser: (id) => {
            dispatch(unfollowAC(id));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        countOfUsers: (count) => {
            dispatch(totalCountAC(count));
        },
        setPage: (page) => {
            dispatch(setPageAC(page));
        }
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;