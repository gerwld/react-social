import React from 'react';
import { connect } from 'react-redux';
import { getUsersThunkCreator, followUserThunkCreator, getPaginationCurrentIndexesTC, onPageChangeThunkCreator } from '../../redux/users-reducer';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';

class UsersAPIComponent extends React.Component {

    componentDidMount() {
        this.props.getUsersThunkCreator(
            this.props.currentPage,
            this.props.pageSize,
            this.props.users.length);
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
                    getPagCurrentIndexes={this.getPagCurrentIndexes} />}

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

const UsersContainer = connect(mapStateToProps, {
    getUsersThunkCreator, followUserThunkCreator,
    getPaginationCurrentIndexesTC, onPageChangeThunkCreator
})(UsersAPIComponent);

export default UsersContainer;