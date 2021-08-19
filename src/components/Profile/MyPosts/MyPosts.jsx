import s from './MyPosts.module.css';
import UserPost from './Post/Post';
import React from 'react';
import { addPostActionCreator, updateTextActionCreator } from '../../../redux/state';


const MyPosts = (props) => {
  let postsData = props.profilePage;
  let userPosts = postsData.postData.map(post => <UserPost likes={post.likes} value={post.cont} />);
  let currentPost = React.createRef();
  let addPost = (e) => {
    e.preventDefault();
    props.dispatch(addPostActionCreator());
    currentPost.current.value = '';
  }
  let onPostChange = (e) => {
    let postText = e.target.value;
    props.dispatch(updateTextActionCreator(postText));
  }

  return (
    <div className={s.user_posts}>
      <span className={s.title}>My Posts</span>
      <form className={s.new_post_input}>
        <textarea ref={currentPost}
          onChange={onPostChange} placeholder="What's happening?"></textarea>
        <input onClick={addPost} type="submit" value="Send"></input>
      </form>
      <div className={s.user_posts__last}>

        {userPosts}

      </div>
    </div>
  );

}

export default MyPosts;