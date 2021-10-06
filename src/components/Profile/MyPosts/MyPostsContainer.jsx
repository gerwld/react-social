import React from 'react';
import { connect } from 'react-redux';
import MyPosts from './MyPosts';
import { sendPost } from '../../../redux/profile-reducer';
import avatarCheck from '../../../utils/validators/avatarCheck';


const mapStateToProps = (state) => {
  return {
    postData: state.profilePage.postData,
    inputValue: state.profilePage.newPostText,
    profile: state.profilePage.profile,
    authUserId: state.profilePage.authUserId,
    avatarCheck: avatarCheck

  }
}

const MyPostsContainer = connect(mapStateToProps, { sendPost })(MyPosts);

export default MyPostsContainer;