import React from 'react';
import { connect } from 'react-redux';
import { addPostActionCreator, updateTextActionCreator } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';

const mapStateToProps = (state) => {
  return {
    postData: state.profilePage.postData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInputValue: (text) => {
      dispatch(updateTextActionCreator(text));
    },
    onAddPost: (e, textInput) => {
      e.preventDefault();
      dispatch(addPostActionCreator());
      textInput.current.value = '';
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;