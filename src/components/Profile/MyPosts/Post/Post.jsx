import s from './Post.module.css';
import avatar from '../../../../img/avatar.jpg';


const Post = (props) => {
    // likes counter check
    let likes = props.likes ? props.likes : "0";
    if (!props.value) {
        return (
            <div className={s.user_posts__last_item}>
                <img src={avatar}></img>
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
                <img src={avatar}></img>
                <div className={s.post_content}>
                    <span>{props.value}</span>
                    <span className={s.likes_count}>{likes}</span>
                </div>
            </div>
        );
    }
};

export default Post;