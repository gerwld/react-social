import React, { useState } from 'react';
import s from "./News.module.css";
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import 'emoji-mart/css/emoji-mart.css'
import './emoji-edit.css';
import { Picker } from 'emoji-mart'

import Foco from 'react-foco';
import ButtonBase from '@mui/material/ButtonBase'
import useScrollPosition from '@react-hook/window-scroll'
import { Textarea_100 } from '../common/FormControls/FormControls';
import { FormControlLabel, Switch } from '@mui/material';
import { AiOutlineCamera } from 'react-icons/ai'
import { RiSendPlaneFill } from 'react-icons/ri'
import { ImFire } from 'react-icons/im'



const News = (props) => {
    var noAvatar = "/images/avatars/def-avatar.png";
    var isHasMore = props.currentPage < 3;

    return (
        <div className={s.news_content}>
            <FeedNavbar />
            <div className={s.main_content}>
                <div className={`${s.whats_new_block} main-content-block`}>
                    <div className={`${s.author_avatar} ${s.whatsnew_avatar}`}><img src={noAvatar} alt="Avatar" /></div>
                    <WhatsNewForm onSubmit={props.whatsNewSubmit} />
                </div>
                {props.postsMap(noAvatar)}
                <InfiniteScroll pageStart="1" children=""
                    loadMore={() => props.loadPosts(props.currentPage + 1, 5)}
                    hasMore={isHasMore} initialLoad={true} threshold={20}
                    loader={<button key={0} className={s.loadMore} onClick={e => props.loadPosts()}>Load more...</button>} />

                {!isHasMore && <div className={s.all_caugth}>
                    <span>You're All Caught Up <i className="far fa-check-circle"></i></span>
                    <p>You've seen all new post from the past {props.lastPostTime}</p>
                </div>}
            </div>
        </div>

    )
}

const FeedNavbar = () => {
    var scrollYPosBigger65 = useScrollPosition(21) > 65;
    return (
        <div className={`${s.navbar_wrapper} ${scrollYPosBigger65 && s.navbar_wrapper_action}`}>
            <div className={`${s.navbar} main-content-block`}>
            <ul className={s.navbar_nav_1}>
                <li className={s.col_block}>
                    <span className={`${s.col_title} ${s.col_title_active}`}>News</span>
                    <ul>
                        <li>Photos</li>
                        <li>Videos</li>
                        <li>Coronavirus</li>
                        <li>Technologies</li>
                    </ul>
                </li>
                <li>Recomendations</li>
                <li>Search</li>
            </ul>
            <ul className={s.navbar_nav_2}>
                <li>Liked recently</li>
            </ul>
            </div>
            <div className={`${s.navbar_interest} main-content-block`}>
                    <FormControlLabel control={<Switch defaultChecked size="small" />} label={<div><ImFire /> Show the most interesting first ‏‏‎  ‏‏‎ </div>} labelPlacement="start"/>
                </div>
        </div>
    )
}

export const FeedBlock = ({ isAuthPost, postId, deletePost, addValueToMessage, ...props }) => {
    var time = moment(props.data, "YYYY-MM-DD-h:mm").format("MMM Do, hh:mm a");
    let [isLoading, disableLoading] = useState(true);
    let [isHide, hideContent] = useState(false);
    let [isComment, showComment] = useState(false);
    let [isShowEmoji, showEmoji] = useState(false);
    let [isLike, toggleLike] = useState(false);
    let [likesCount, likeAction] = useState(isNaN(props.likesCount) ? (22 + Math.floor(Math.random() * 10)) : props.likesCount);
    let [isShowSet, toggleSet] = useState(false);
    let [autoFocus, setFocus] = useState(true);

    const PostCommentForm = reduxForm({ form: `${postId}_form`, destroyOnUnmount: false,
    keepDirtyOnReinitialize: true, forceUnregisterOnUnmount: true })(PostCommentsBlock);

    let likePress = (e, id) => {
        let buttonIcon = e.currentTarget.children[0];
        //TODO change after to send request with id => get response, then change local state
        toggleLike(!isLike);
        if (isLike) {
            likeAction(likesCount - 1);
            buttonIcon.className = "far fa-heart";
        } else {
            likeAction(likesCount + 1);
            buttonIcon.className = `fa fa-heart ${s.like_pressed}`;
        }
    }

    return (
        <div className={`${s.feed__main_block} ${isHide && s.hide_content} main-content-block`}>
            {isHide && <div className={s.hide_content_block}>
                <span>Posts from this source have been removed from the feed.</span>
                <button onClick={() => hideContent(false)}>Cancel</button>
            </div>}
            <div className={s.block_author}>
                <div className={s.author_avatar}>
                    {props.avatar ? <img src={props.avatar} alt="Author avatar" /> : <img src={props.nv} alt="Author avatar" />}
                </div>
                <div className={s.main_info}>
                    <NavLink to="/" className={s.author_name}>{props.author}</NavLink>
                    <span className={s.post_time}>{time}</span>
                </div>
            </div>
            <div className={s.block_content}>
                <p>{props.text}</p>
                {props.img &&
                    <div className={`${s.post_image} ${s.load_wrapper}`}>
                        <a href={props.postLink} target="_blank" rel="noreferrer">
                            <LazyLoadImage effect="opacity" width="650px" src={props.img}
                                threshold={1} delayMethod='false' alt="Post img" wrapperClassName={s.imageSpanWrap}
                                afterLoad={() => disableLoading(false)} onError={i => i.target.style.display = 'none'} />
                        </a>
                        {isLoading && <div className={s.load_activity}></div>}
                    </div>}
            </div>
            <div className={s.block_buttons}>
                <div className={s.like_btn}>
                    <button onClick={e => likePress(e)}><i className="far fa-heart" /></button>
                    <span>{likesCount}</span>
                </div>
                <div className={s.comment_btn}>
                    <button onClick={() => showComment(true)} ><i className="far fa-comment-alt"></i></button>
                    <span>0</span>
                </div>
                <div className={s.share_btn}>
                    <button ><i className="fa fa-share" /></button>
                </div>
            </div>
            <div className={s.control_buttons}>
                <Foco onClickOutside={() => toggleSet(false)}>
                    <ButtonBase children={<button onClick={() => toggleSet(!isShowSet)}><i className="fas fa-ellipsis-h"></i></button>} />
                    {isShowSet && <DropDownMenu postId={postId} isAuthor={isAuthPost} hideContent={hideContent} deletePost={deletePost} />}
                </Foco>
            </div>
            {isComment && <PostCommentForm emojiTogle={showEmoji} autoFocus={autoFocus}/>}
            {isShowEmoji &&
                    <div onMouseLeave={() => showEmoji(false)} className={`${s.emoji_picker} picker_style`}>
                        <Foco onClickOutside={() => showEmoji(false)}>
                            <Picker set='apple' include={['search', 'smileys', 'people', 'nature']} sheetSize="32" showSkinTones="false" onSelect={e => {addValueToMessage(e, `${postId}_form`); setFocus(true)}} title=""/>
                        </Foco>
                    </div>}
        </div>
    )
}

const DropDownMenu = ({ isAuthor, hideContent, deletePost, postId }) => {
    //Almost all here is hardcoded, so actions road is also simple.
    let dropDown = [
        { id: 'hide', name: "Not show post's from this group", onClick: () => hideContent(true), icon: "fa-solid fa-eye-slash" },
        { id: 'report', name: "Report problem", onClick: (e) => e, icon: "fa-solid fa-circle-exclamation" },
        { id: 'why', name: "Why am i seeing this content?", onClick: (e) => e, icon: "fa-solid fa-circle-question" },
    ];
    let dropDownAuthor = [
        { id: 'delete', name: "Delete post", onClick: () => setTimeout(() => {deletePost(postId)}, 200), icon: "fa-solid fa-trash" },
        { id: 'edit', name: "Edit post", onClick: (e) => e, icon: "fa-solid fa-edit" },
        { id: 'report', name: "Report problem", onClick: (e) => e, icon: "fa-solid fa-circle-exclamation" }
    ];
    let set = isAuthor ? dropDownAuthor : dropDown;

    return (<div className={s.dropdown_menu}>
        <ul>
            {set.map(prop => <li key={prop.id} onClick={(id) => prop.onClick(id)}>
                {prop.icon && <i className={`${prop.icon} ${s.icons}`} />}
                <span>{prop.name}</span>
            </li>)}
        </ul>
    </div>);
}

const WhatsNew = (props) => {
    const [fieldHeight, setHeight] = useState("45px");

    return <form onSubmit={props.handleSubmit}>
        <div className={s.whatsnew_field}>
            <Field component={Textarea_100} height={fieldHeight} name="postData" placeholder="What's going on?"
                onClick={() => setHeight("80px")} onBlur={() => setTimeout(() => setHeight("45px"), 2000)} />
            <button className={s.clipFile} type="button"><i className="fa fa-camera"></i></button>
        </div>
        <button className={s.send} type="submit"><i className="fa fa-paper-plane"></i></button>
    </form>
}

const PostCommentsBlock = ({ emojiTogle, ...props }) => {
    return <form onSubmit={props.handleSubmit} className={s.comment_block}>
        <div className={s.comment_field}>
            <Field component="textarea" name="comment" />
            <button className={s.clipFile} type="button"><AiOutlineCamera /></button>
            <button className={s.emoji_btn} type="button" onMouseOver={() => emojiTogle(true)} onClick={() => emojiTogle(true)}><i className="far fa-smile" /></button>
        </div>
        <ButtonBase class={s.comment_button} children={<RiSendPlaneFill />} />
    </form>
}

const WhatsNewForm = reduxForm({ form: "whatsNewFeed" })(WhatsNew);

export default News;