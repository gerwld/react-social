import s from './MyPosts.module.css';
import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Textarea_100 } from '../../common/FormControls/FormControls';
import { FeedBlock } from '../../News/News';
import { NavLink } from 'react-router-dom';


const MyPosts = (props) => {
  let userPosts = props.postData.map(post => <div key={post.id} className={s.feed_block}><FeedBlock postId={post.id} data="2021-10-16T14:00:00Z" author={props.fullName} avatar={props.avatar} likesCount={post.likes} text={post.cont} img="" /></div>);
  const currentActive = (link) => {
    if (link === "my_posts") return s.user_posts_ac_1;
    else if (link === "post_archive")return s.user_posts_ac_2;
  }

  return (
    <><div className={`${s.user_posts} main-content-block`}>
      <MyPostReduxForm onSubmit={e => props.sendPost(e)} {...props} />
    </div>
      <div className={`${s.user_posts}`}>
        <div className={`${s.user_posts_navtitle} main-content-block`}>
          <ul className={`${s.user_posts_nav} ${currentActive(props.match.params.flags)}`}>
            <li><NavLink to="/profile" exact activeClassName={s.active}>All posts</NavLink></li>
            <li><NavLink to="/profile/filter=my_posts" activeClassName={s.active}>My posts</NavLink></li>
            <li><NavLink to="/profile/filter=post_archive" activeClassName={s.active}>Post archive</NavLink></li>
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
      <img src={props.avatar} alt="profile" />
    </div>
    <div className={s.new_post_input}>
      <Field component={Textarea_100} height={fieldHeight} name="post" placeholder="What's happening?"
        onClick={() => setHeight("80px")} onBlur={() => setTimeout(() => setHeight("45px"), 2000)} />
      <button className={s.clipFile} type="button"><i className="fa fa-camera"></i></button>
    </div>
    <button className={s.send} type="submit"><i class="fa fa-paper-plane" /></button>
  </form>
}

const MyPostReduxForm = reduxForm({ form: "myPosts" })(MyPostForm);


export default MyPosts;