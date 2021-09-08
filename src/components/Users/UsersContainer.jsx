import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { unfollowUser, setUsers, countOfUsers, setPage, toggleIsFetching} from '../../redux/users-reducer';

class UsersAPIComponent extends React.Component {

    componentDidMount() {
        if (this.props.users.length < 4) {
            this.props.toggleIsFetching(true);
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`).then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
                this.props.countOfUsers(response.data.totalCount);
            });
        }
    }

    onPageChanged = (pageNumber) => {
        this.props.setPage(pageNumber);
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`).then(response => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(response.data.items);
        });
    }

    render() {
        return (
            <>
            {this.props.isFetching && <Preloader />}
            <Users totalUsers={this.props.totalUsers}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                unfollowUser={this.props.unfollowUser}
                isFetching={this.props.isFetching} />
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

// const mapDispatchToProps = (dispatch) => {
//     return {
//         unfollowUser: (id) => {
//             dispatch(unfollowAC(id));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         countOfUsers: (count) => {
//             dispatch(totalCountAC(count));
//         },
//         setPage: (page) => {
//             dispatch(setPageAC(page));
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(setIsFetchingAC(isFetching));
//         }
//     } 
// }

// Reminder: (unfollowUser: unfollowUser) === (unfollowUser) in object


const UsersContainer = connect(mapStateToProps, {unfollowUser, setUsers, countOfUsers, setPage, toggleIsFetching})(UsersAPIComponent);

export default UsersContainer;