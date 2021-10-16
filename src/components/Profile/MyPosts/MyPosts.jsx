import s from './MyPosts.module.css';
import Post from './Post/Post';
import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Textarea_100 } from '../../common/FormControls/FormControls';
import { AiOutlineSend } from 'react-icons/ai'
import { FeedBlock } from '../../News/News';


const MyPosts = (props) => {
  let userPost = props.postData.map(post => <div key={post.id}><Post likes={post.likes} value={post.cont} profile={props.profile} /></div>);
  let userPosts = props.postData.map(post => <div key={post.id} className={s.feed_block}><FeedBlock postId={post.id} data="2021-10-16T14:00:00Z" author={props.fullName} avatar={props.avatar} likesCount={post.likes} text={post.cont} img=""/></div>);
  return (
    <><div className={`${s.user_posts} main-content-block`}>
       <MyPostReduxForm onSubmit={e => props.sendPost(e)} {...props} />
    </div>
    <div className={`${s.user_posts}`}>
      <div className={`${s.user_posts_navtitle} main-content-block`}>
        <ul className={s.user_posts_nav}>
          <li>All posts</li>
          <li>My posts</li>
          <li>Post archive</li>
        </ul>
        </div>
      <div className={s.user_posts__last}>
        {userPosts}
      </div>
    </div>
    </>
  );
}

const MyPostForm = (props) => {
  const [fieldHeight, setHeight] = useState("45px");

    return <form className={s.new_post_form} onSubmit={props.handleSubmit}>
       <div className={s.user_avatar}>
          <img src={props.avatar} alt="profile"/>
        </div>
        <div className={s.new_post_input}>
            <Field component={Textarea_100} height={fieldHeight} name="postData" placeholder="What's happening?"
                onClick={() => setHeight("80px")} onBlur={() => setTimeout(() => setHeight("45px"), 2000)} />
            <button className={s.clipFile} type="button"><i className="fa fa-camera"></i></button>
        </div>
        <button className={s.send} type="submit"><i class="fa fa-paper-plane"/></button>
    </form>
}

const MyPostReduxForm = reduxForm({ form: "myPosts"})(MyPostForm);


export default MyPosts;