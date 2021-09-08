import React from 'react';
import { connect } from 'react-redux';
import MyPosts from './MyPosts';
import { onInputValue, onAddPost } from '../../../redux/profile-reducer';

const mapStateToProps = (state) => {
  return {
    postData: state.profilePage.postData,
    inputValue: state.profilePage.newPostText
  }
}

const MyPostsContainer = connect(mapStateToProps, { onInputValue, onAddPost })(MyPosts);

export default MyPostsContainer;