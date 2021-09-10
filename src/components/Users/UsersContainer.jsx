import React from 'react';
import { connect } from 'react-redux';
import { usersAPI } from '../../api/api';
import { countOfUsers, setPage, setUsers, toggleIsFetching, toggleIsFollowing, unfollowUser, getAllPages } from '../../redux/users-reducer';
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
                this.props.getAllPages(Math.ceil(this.props.totalUsers / this.props.pageSize));
                console.log(this.props)
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

    getPagCurrentIndexes = () => {
        let curPage = this.props.currentPage;
        let allPages = this.props.allPages;
        let pagLength = this.props.pagLength;
        let pagination = [];

        var notSmallerThanPag = (curPage + 2) > pagLength ? (curPage + 2) : pagLength;
        var count = 1;
        if(curPage > 3) {
            count = curPage - 2;
        }
        if(curPage > allPages - 3) {
            count = curPage - 4;
        }

        for(count; count <= notSmallerThanPag && count <= allPages; count++) {
           pagination.push(count);
        }
        return pagination;
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
                isFollowing={this.props.isFollowing}
                getPagCurrentIndexes={this.getPagCurrentIndexes}
                allPages={this.props.allPages} />}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowing: state.usersPage.isFollowing,
        totalUsers: state.usersPage.totalUsers,
        pageSize: state.usersPage.pageSize,
        allPages: state.usersPage.allPages,
        pagLength: state.usersPage.pagLength
    }
}

const UsersContainer = connect(mapStateToProps, {unfollowUser, setUsers, countOfUsers, setPage, toggleIsFetching, toggleIsFollowing, getAllPages})(UsersAPIComponent);

export default UsersContainer;