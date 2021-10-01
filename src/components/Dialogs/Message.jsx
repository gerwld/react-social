import { NavLink } from 'react-router-dom';
import s from './Dialogs.module.css';

const Message = (props) => {
    let userPic = props.avatar ? props.avatar : "/images/avatars/def-avatar.png";
    return (
        <div key={props.id} className={s.message}>
            <NavLink to={`/profile/id${props.senderId}`}>
                <img className={s.userAvatar} alt="User Avatar" src={userPic}/>
            </NavLink>
            <div className={s.message_content}>
            <NavLink to={`/profile/id${props.senderId}`}>
                <span className={s.user_data}>{props.senderName}</span>
            </NavLink>
                <span>{props.body}</span>
                <span className={s.message_data}>{props.addedAt}</span>
            </div>
        </div>
    );
};

export default Message;