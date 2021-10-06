import { useState } from 'react';
import avatarCheck from '../../../../utils/validators/avatarCheck';
import './Post.css';

const Post = (props) => {
    let [isLikePressed, toggleLike] = useState(false);
    let [likesCount, likeAction] = useState(props.likes);
    let isPostNotEmpty = (props.value && props.value !== " " && props.value !== "");

    let likePress = (e, id) => {
        //change after to send request with id => get response, then change local state
        if(isLikePressed){
            toggleLike(false);
            likeAction(likesCount - 1);
            e.currentTarget.className = "likes_count";
        } else {
            toggleLike(true);
            likeAction(likesCount + 1);
            e.currentTarget.className = "likes_count like_pressed";
        }
    }

        return (
            <div className="user_posts__last_item">
                <img alt="Avatar" src={avatarCheck(props.profile.photos)}></img>
                <div className="post_content">
                {isPostNotEmpty ? 
                    <span>{props.value}</span> :
                    <span className="empty_cm">Empty post</span> }
                    <button onClick={e => likePress(e, 1)} className="likes_count"><i className={"fa-heart " + (isLikePressed ? "fa like_pressed" : "far")} />{likesCount || "0"}</button>
                </div>
            </div>
        );
};

export default Post;