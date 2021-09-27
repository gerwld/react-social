import React from 'react';
import s from "./News.module.css";
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

const News = (props) => {
    var avatar = (false ? null : "/images/avatars/def-avatar.png");
    var whatsNewSubmit = (submit) => {
        // TODO:
    }

    return (
        <div>
            <div className={`${s.whats_new_block} main-content-block`}>
                <div className={`${s.author_avatar} ${s.whatsnew_avatar}`}><img src={avatar} alt="Avatar" /></div>
                <WhatsNewForm onSubmit={whatsNewSubmit} />
            </div>
            <FeedBlock {...props} avatar={avatar} />
            <FeedBlock {...props} avatar={avatar} />
        </div>

    )
}

const WhatsNew = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.whatsnew_field}>
            <Field component="textarea" name="whats-new" placeholder="What's going on?" />
            <button className={s.clipFile} type="button"><i class="fa fa-camera"></i></button>
            </div>
            <button className={s.send} type="submit"><i class="fa fa-paper-plane"></i></button>
        </form>
    )
}

const FeedBlock = (props) => {
    return (
        <div className={`${s.feed__main_block} main-content-block`}>
            <div className={s.block_author}>
                <div className={s.author_avatar}><img src={props.avatar} alt="Author avatar" /></div>
                <div className={s.main_info}>
                    <NavLink to="/" className={s.author_name}>Artem A</NavLink>
                    <span className={s.post_time}>2:21</span>
                </div>
            </div>
            <div className={s.block_content}>
                <p>Post content</p>
                <div className={s.post_image}>
                    <img src="post-image.png" alt="Post img" />
                </div>
            </div>
            <div className={s.block_buttons}>
                <div className={s.like_btn}>
                    <button onClick=""><i class="far fa-heart" /></button>
                    <span>32</span>
                </div>
                <div className={s.comment_btn}>
                    <button onClick=""><i class="far fa-comment-alt"></i></button>
                    <span>0</span>
                </div>
                <div className={s.share_btn}>
                    <button onClick=""><i class="fa fa-share" /></button>
                </div>
            </div>
            <div className={s.control_buttons}>
                <button onClick=""><i class="fas fa-ellipsis-h"></i></button>
            </div>
        </div>
    )
}

const WhatsNewForm = reduxForm({ form: "whatsNewFeed" })(WhatsNew);

export default News;