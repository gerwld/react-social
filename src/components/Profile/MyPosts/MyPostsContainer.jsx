import React from 'react';
import { connect } from 'react-redux';
import MyPosts from './MyPosts';
import { sendPost } from '../../../redux/profile-reducer';

let avatar_check = (pic) => { 
  if(pic.large) {
      return pic.large;
  } else {
      if(pic.small) return pic.small;
      return "/images/avatars/def-avatar.png";
  }
}

const mapStateToProps = (state) => {
  return {
    postData: state.profilePage.postData,
    inputValue: state.profilePage.newPostText,
    profile: state.profilePage.profile,
    authUserId: state.profilePage.authUserId,
    avatarCheck: avatar_check

  }
}

const MyPostsContainer = connect(mapStateToProps, { sendPost })(MyPosts);

export default MyPostsContainer;