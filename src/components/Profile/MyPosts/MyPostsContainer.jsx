import UserPost from './Post/Post';
import React from 'react';
import { addPostActionCreator, updateTextActionCreator } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';


const MyPostsContainer = (props) => {

  let state = props.store.getState();

  let onPostChange = (text) => {
    props.store.dispatch(updateTextActionCreator(text));
  }

  let addPost = (e, textInput) => {
    e.preventDefault();
    props.store.dispatch(addPostActionCreator());
    textInput.current.value = '';
  }

  return (
    <MyPosts onAddPost={addPost} onInputValue={onPostChange} postData={state.profilePage.postData}/>
  );
}

export default MyPostsContainer;