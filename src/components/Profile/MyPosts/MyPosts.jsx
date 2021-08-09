import s from './MyPosts.module.css';
import UserPost from './Post/Post';

const MyPosts = () => {
    return(
        <div className={s.user_posts}>
        <span className={s.title}>My Posts</span>
        <form className={s.new_post_input}>
          <textarea placeholder="What's happening?"></textarea>
          <input type="submit" value="Send"></input>
        </form>
        <div className={s.user_posts__last}>
          <UserPost likes="23" value="Hi there!! 2007 is rock!"/>
          <UserPost likes="18" value="Deez nuts... Today everything is fine, just vibing with my famity #coolday"/>
          <UserPost likes="228"/>
        </div>
      </div>
    );

}

export default MyPosts;