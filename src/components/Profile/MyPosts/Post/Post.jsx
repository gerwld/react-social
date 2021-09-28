import s from './Post.module.css';

const Post = (props) => {
    let isPostNotEmpty = (props.value && props.value !== " " && props.value !== "");
    let avatar_check = (pic) => { 
        if(pic.large) {
            return pic.large;
        } else {
            if(pic.small) return pic.small;
            return "/images/avatars/def-avatar.png";
        }
    }
 
        return (
            <div className={s.user_posts__last_item}>
                <img alt="Avatar" src={avatar_check(props.profile.photos)}></img>
                <div className={s.post_content}>
                {isPostNotEmpty ? 
                    <span>{props.value}</span> :
                    <span className={s.empty_cm}>Empty post</span> }
                    <span className={`${s.likes_count}`}>{props.likes || "0"}</span>
                </div>
            </div>
        );
};

export default Post;