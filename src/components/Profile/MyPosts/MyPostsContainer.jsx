import React from 'react';
import { addPostActionCreator, updateTextActionCreator } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import StoreContext from '../../../StoreContext';


const MyPostsContainer = (props) => {

  return (
    <StoreContext.Consumer>
      {(store) => {
        let state = store.getState();

        let onPostChange = (text) => {
          store.dispatch(updateTextActionCreator(text));
        }

        let addPost = (e, textInput) => {
          e.preventDefault();
          store.dispatch(addPostActionCreator());
          textInput.current.value = '';
        }

        return (
          <MyPosts onAddPost={addPost} onInputValue={onPostChange} postData={state.profilePage.postData} />
        )
      }
      }
    </StoreContext.Consumer>
  )
}

export default MyPostsContainer;