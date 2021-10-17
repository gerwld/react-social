import React from 'react';
import { connect } from 'react-redux';
import MyPosts from './MyPosts';
import { sendPost } from '../../../redux/profile-reducer';
import avatarCheck from '../../../utils/validators/avatarCheck';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

const mapStateToProps = (state) => {
  return {
    postData: state.profilePage.postData,
    inputValue: state.profilePage.newPostText,
    profile: state.profilePage.profile,
    authUserId: state.profilePage.authUserId,
    avatarCheck: avatarCheck

  }
}

const MyPostsContainer = compose(
  connect(mapStateToProps, { sendPost }),
  withRouter
)(MyPosts);

export default MyPostsContainer;