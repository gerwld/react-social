import s from './Dialogs.module.css';
import avatar from '../../img/avatar.jpg';
import avatar2 from '../../img/avatar-2.jpg';

let avatars = [avatar, avatar2];

const Message = (props) => {
    let userPic = avatars[props.userid];
    const userdata = props.userdata ? props.userdata : "Anatoly K";
    return (
        <div className={s.message}>
            <img src={userPic}></img>
            <div className={s.message_content}>
                <span className={s.user_data}>{userdata}</span>
                <span>{props.content}</span>
            </div>
        </div>
    );
};

export default Message;