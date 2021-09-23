import s from './MyPosts.module.css';
import UserPost from './Post/Post';
import React from 'react';
import { Field, reduxForm } from 'redux-form';


const MyPosts = (props) => {
  let userPosts = props.postData.map(post => <UserPost likes={post.likes} value={post.cont} profile={props.profile} />);
  let currentPost = React.createRef();

  return (
    <div className={s.user_posts}>
      <span className={s.title}>My Posts</span>
      <MyPostReduxForm onSubmit={e => props.sendPost(e)} {...props} currentPost={currentPost} />
      <div className={s.user_posts__last}>

        {userPosts}

      </div>
    </div>
  );
}

const MyPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.new_post_input}>
      <Field component="textarea" name="post" placeholder="What's happening?"></Field>
      <button type="submit">Send</button>
    </form>
  )
}

const MyPostReduxForm = reduxForm({ form: "myPosts" })(MyPostForm);


export default MyPosts;

// "What's happening?"

// value={props.inputValue}