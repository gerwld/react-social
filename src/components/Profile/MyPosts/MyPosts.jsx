import s from './MyPosts.module.css';
import UserPost from './Post/Post';


const MyPosts = (props) => {

  let userPosts = props.data.map(post => <UserPost likes={post.likes} value={post.cont} />);

  return (
    <div className={s.user_posts}>
      <span className={s.title}>My Posts</span>
      <form className={s.new_post_input}>
        <textarea placeholder="What's happening?"></textarea>
        <input type="submit" value="Send"></input>
      </form>
      <div className={s.user_posts__last}>

        {userPosts}

      </div>
    </div>
  );

}

export default MyPosts;