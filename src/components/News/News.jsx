import React from 'react';
import s from "./News.module.css";
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';

const News = (props) => {
    var noAvatar = "/images/avatars/def-avatar.png";
    var whatsNewSubmit = (submit) => { };
    var postsMap = props.posts.map(post => {
        return <FeedBlock text={post.title} avatar={post.avatar} nv={noAvatar}
            author={post.source.name} data={post.publishedAt} img={post.urlToImage}
            postLink={post.url} />
    })

    return (
        <div>
            <div className={`${s.whats_new_block} main-content-block`}>
                <div className={`${s.author_avatar} ${s.whatsnew_avatar}`}><img src={noAvatar} alt="Avatar" /></div>
                <WhatsNewForm onSubmit={whatsNewSubmit} />
            </div>
            {postsMap}
            <button className={s.loadMore} onClick={e => props.loadPosts()}>Load more...</button>
        </div>

    )
}

const FeedBlock = (props) => {

    var time = (data = props.data) => {
        return moment(data, "YYYY-MM-DD-h:mm").format("MMM Do, hh:mm a");
    }

    return (
        <div className={`${s.feed__main_block} main-content-block`}>
            <div className={s.block_author}>
                <div className={s.author_avatar}>
                    {props.avatar ? <img src={props.avatar} alt="Author avatar" /> : <img src={props.nv} alt="Author avatar" />}
                </div>
                <div className={s.main_info}>
                    <NavLink to="/" className={s.author_name}>{props.author}</NavLink>
                    <span className={s.post_time}>{time()}</span>
                </div>
            </div>
            <div className={s.block_content}>
                <p>{props.text}</p>
                {props.img &&
                    <div className={s.post_image}>
                        <a href={props.postLink} target="_blank" rel="noreferrer"><img src={props.img} alt="Post img" /></a>
                    </div>}
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

const WhatsNewForm = reduxForm({ form: "whatsNewFeed" })(WhatsNew);

export default News;