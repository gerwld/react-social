import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { setPageAC, setUsersAC, totalCountAC, unfollowAC } from '../../redux/users-reducer';
import Users from './Users';

class UsersAPIComponent extends React.Component {

    componentDidMount() {
        if (this.props.users.length < 4) {
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`).then(response => {
                this.props.setUsers(response.data.items);
                this.props.countOfUsers(response.data.totalCount);
            });
        }
    }

    onPageChanged = (pageNumber) => {
        this.props.setPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`).then(response => {
            this.props.setUsers(response.data.items);
        });
    }

    render() {
        return (
            <Users totalUsers={this.props.totalUsers}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                unfollowUser={this.props.unfollowUser} />
        )
    }
}

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

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent);

export default UsersContainer;