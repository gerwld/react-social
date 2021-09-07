import React from 'react';
import { connect } from 'react-redux';
import { setUsersAC, totalCountAC, unfollowAC } from '../../redux/users-reducer';
import Users from './UsersClass';

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        totalUsers: state.usersPage.totalUsers
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
        }
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;