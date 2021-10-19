import React, { useState } from 'react';
import s from "./News.module.css";
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import 'emoji-mart/css/emoji-mart.css'
import './emoji-edit.css';
import { Picker } from 'emoji-mart'

import Foco from 'react-foco';
import useScrollPosition from '@react-hook/window-scroll'
import { FormControlLabel, Switch } from '@mui/material';
import { AiOutlineCamera } from 'react-icons/ai'
import { RiArrowDownSLine, RiSendPlaneFill } from 'react-icons/ri'
import { IoCloseSharp } from 'react-icons/io5'
import { BiCheck } from 'react-icons/bi'
import { ImFire } from 'react-icons/im'
import LazyLoadImageHOC from '../../hoc/LazyLoad';
import Popup from 'reactjs-popup';
import WhatsNew from '../common/WhatsNewForm/WhatsNew';
import ActionBlockButton from '../common/DropDownMenu/DropDownMenu';
import ButtonBase from '@mui/material/ButtonBase';





const News = (props) => {
    var isHasMore = props.currentPage < 3;
    const WhatsNewForm = reduxForm({ form: "whatsNewFeed" })(WhatsNew);

    return (
        <div className={s.news_content}>
            <FeedNavbar />
            <div className={s.main_content}>
                <WhatsNewForm onSubmit={props.whatsNewSubmit} styles={s.whatsNewSubmit_feed} button={s.whatsNewSubmit_btn} fullWidth="80" />
                {props.postsMap("/images/avatars/def-avatar.png")}
                <InfiniteScroll  children=""
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
                            <li>Technologies </li>
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
                <FormControlLabel control={<Switch defaultChecked size="small" />} label={<div><ImFire /> Show the most interesting first ‏‏‎  ‏‏‎ </div>} labelPlacement="start" />
            </div>
        </div>
    )
}

export const FeedBlock = ({ isAuthPost, postId, deletePost, addValueToMessage, isPopup, comments, addComment, ...props }) => {

    var time = moment(props.data, "YYYY-MM-DD-h:mm").format("MMM Do, hh:mm a");
    let [isLoading, disableLoading] = useState(true);
    let [isHide, hideContent] = useState(false);
    let [isComments, addComm] = useState(comments && comments.length > 0);
    let [isComment, showComment] = useState(isComments || false);
    let [isShowEmoji, showEmoji] = useState(false);
    let [isLike, toggleLike] = useState(false);
    let [likesCount, likeAction] = useState(props.likesCount ? props.likesCount : 0);
    let [isShowSet, toggleSet] = useState(false);
    let [isShowSetPop, toggleSetPop] = useState(false);
    let [autoFocus, setFocus] = useState(true);
    // const [sort, setSort] = React.useState("");
    // const comHandle = e => setSort(e.target.value);

    const PostCommentForm = reduxForm({
        form: `${postId}_form`, destroyOnUnmount: false,
        keepDirtyOnReinitialize: true, forceUnregisterOnUnmount: true
    })(PostCommentsBlock);

    let likePress = (id) => {
        //TODO change after to send request with id => get response, then change local state
        toggleLike(!isLike);
        if (isLike) likeAction(likesCount - 1);
        else likeAction(likesCount + 1);
    }

    return (
        <div className={`${s.feed__main_block} ${isHide && s.hide_content} main-content-block anim-theme`}>
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
                    <span className={s.post_time}>{isNaN(props.data[0]) ? props.data : time}</span>
                </div>
            </div>
            <div className={s.block_content}>
                <p>{props.text}</p>
                {props.img &&
                    <div className={`${s.post_image} ${s.load_wrapper}`}>
                        {isPopup ? <PopupFullSizeFeed lc={likesCount} isShowSetPop={isShowSetPop} toggleSetPop={toggleSetPop} postId={postId}
                            isAuthPost={isAuthPost} hideContent={hideContent} isLike={isLike} deletePost={deletePost} likePress={likePress}
                            showComment={showComment} disableLoading={disableLoading} time={time} {...props} /> :
                            <LazyLoadImageHOC img={props.img} s={s.imageSpanWrap} d={disableLoading} />}
                        {isLoading && <div className={s.load_activity}></div>}
                    </div>}
            </div>
            <ButtonsBlock likePress={likePress} likesCount={likesCount} showComment={showComment} isLike={isLike} commentsLength={comments ? comments.length : 0} />


            {isComment &&
                <div className={s.comments_parent}>
                   {isComments > 0 && 
                   <label className={s.select}>
                        <select name="select">
                            <option value="value1" selected>Newest</option>
                            <option value="value2">Oldest</option>
                        </select><RiArrowDownSLine />
                    </label>}
                    {comments && comments.map(c => {
                        let commentData = moment(c.data).startOf('minute').fromNow();
                        return <div key={c.id} className={s.comment_block}>
                            <div className={s.comment_cred}>
                                <div className={s.comment_name}>{c.fullName}</div>
                                <p className={s.comment_text}>{c.text}</p>
                                <span className={s.comment_data}>{commentData}</span>
                            </div>
                            <div className={s.comment_ava}><img src={c.avatar} alt={c.fullName} title={c.fullName} /></div>
                            <div className={s.comment_buttons}>
                                <div className={s.del_btn}><button><IoCloseSharp /></button></div>
                                <div className={s.like_btn}>
                                    <button><i className={'fa fa-heart'} /></button>
                                    <span>{c.likes}</span>
                                </div>
                            </div>
                        </div>
                    })}
                </div>}


            <div className={s.control_buttons}>
                <ActionBlockButton isShowSet={isShowSet} toggleSet={toggleSet} postId={postId}
                    isAuthPost={isAuthPost} hideContent={hideContent} deletePost={deletePost} />
            </div>
            {isComment && <PostCommentForm emojiTogle={showEmoji} autoFocus={autoFocus} onSubmit={e => addComment(e, postId)} />}
            {isShowEmoji &&
                <div onMouseLeave={() => showEmoji(false)} className={`${s.emoji_picker} picker_style`}>
                    <Foco onClickOutside={() => showEmoji(false)}>
                        <Picker set='apple' include={['search', 'smileys', 'people', 'nature']} sheetSize="32" showSkinTones="false" onSelect={e => { addValueToMessage(e, `${postId}_form`); setFocus(true) }} title="" />
                    </Foco>
                </div>}
        </div>
    )
}

const ButtonsBlock = ({ likePress, likesCount, showComment, isLike, commentsLength }) => {
    return (
        <div className={s.block_buttons}>
            <div className={s.like_btn}>
                <button onClick={e => likePress(e)}><i className={`${isLike ? 'fa ' + s.like_pressed : 'far'} fa-heart`} /></button>
                <span>{likesCount}</span>
            </div>
            <div className={s.comment_btn}>
                <button onClick={() => showComment(true)} ><i className="far fa-comment-alt"></i></button>
                <span>{commentsLength || 0}</span>
            </div>
            <div className={s.share_btn}>
                <button ><i className="fa fa-share" /></button>
            </div>
        </div>
    )
}

const PopupFullSizeFeed = ({ isShowSetPop, toggleSetPop, postId, isAuthPost,
    hideContent, deletePost, likePress, showComment, disableLoading, time, lc, isLike, ...props }) => {

    return (
        <Popup lockScroll={true} modal={true} trigger={<div><LazyLoadImageHOC img={props.img} s={s.imageSpanWrap} d={disableLoading} /></div>} position="right center">
            {close => (
                <div className={s.news_popup}>
                    <div className={`${s.news_popup_content} main-content-block`}>
                        <div className={s.block_author}>
                            <div className={s.author_avatar}>
                                {props.avatar ? <img src={props.avatar} alt="Author avatar" /> : <img src={props.nv} alt="Author avatar" />}
                            </div>
                            <div className={s.main_info}>
                                <NavLink to="/" className={s.author_name}>{props.author}</NavLink>
                                <span className={s.post_time}>{isNaN(props.data[0]) ? props.data : time}</span>
                            </div>
                            <div className={s.news_popup_buttons}>
                                <button className={s.follow}><BiCheck />Following</button>
                                <ActionBlockButton isShowSet={isShowSetPop} toggleSet={toggleSetPop} postId={postId}
                                    isAuthPost={isAuthPost} hideContent={hideContent} deletePost={deletePost} />
                            </div>
                        </div>

                        <div className={s.fullscreen_post_content}>{props.content.split("[")[0]}</div>
                        <div className={s.fullscreen_post_img}><img src={props.img} alt="Post" /></div>
                        <ButtonsBlock likePress={likePress} likesCount={lc} showComment={showComment} isLike={isLike} />
                    </div>
                    <div className={s.news_popup__bg} onClick={close} />
                </div>
            )}
        </Popup>
    )
}

const PostCommentsBlock = ({ emojiTogle, handleSubmit, ...props }) => {
    return <form onSubmit={handleSubmit} className={s.comment_block_form}>
        <div className={s.comment_field}>
            <Field component="textarea" name="comment" />
            <button className={s.clipFile} type="button"><AiOutlineCamera /></button>
            <button className={s.emoji_btn} type="button" onMouseOver={() => emojiTogle(true)} onClick={() => emojiTogle(true)}><i className="far fa-smile" /></button>
        </div>
        <ButtonBase type="submit" className={s.comment_button} children={<RiSendPlaneFill />} />
    </form>
}

export default News;