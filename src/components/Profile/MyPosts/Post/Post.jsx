import s from './Post.module.css';
import avatar from '../../../../img/avatar.jpg';


const Post = (props) => {
    // likes counter check
    let likes = props.likes ? props.likes : "0";
    let avatar = props.profile.photos;
    let avatar_check = avatar.large ? avatar.large : (avatar.small ? avatar.small :  "/images/avatars/def-avatar.png");
    if (!props.value) {
        return (
            <div className={s.user_posts__last_item}>
                <img alt="Avatar" src={avatar_check}></img>
                <div className={s.post_content}>
                    <span className={s.empty_cm}>Empty post</span>
                    <span className={`${s.likes_count} ${s.likes_disabled}`}>0</span>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className={s.user_posts__last_item}>
                <img alt="Avatar" src={avatar_check}></img>
                <div className={s.post_content}>
                    <span>{props.value}</span>
                    <span className={s.likes_count}>{likes}</span>
                </div>
            </div>
        );
    }
};

export default Post;