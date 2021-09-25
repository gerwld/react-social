import React from 'react';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getUsersThunkCreator, followUserThunkCreator, getPaginationCurrentIndexesTC, onPageChangeThunkCreator, getAllPages } from '../../redux/users-reducer';
import { getCurrentPage, getUsers, getIsFetching, getIsFollowing, getTotalUsers, getPageSize, getPagLength, getPages } from '../../redux/users-selectors';
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
        users: getUsers(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowing: getIsFollowing(state),
        totalUsers: getTotalUsers(state),
        pageSize: getPageSize(state),
        allPages: getPages(state),
        pagLength: getPagLength(state)
    }
}

const UsersContainer = connect(mapStateToProps, {
    getUsersThunkCreator, followUserThunkCreator,
    getPaginationCurrentIndexesTC, onPageChangeThunkCreator
})(UsersAPIComponent);

export default withAuthRedirect(UsersContainer);