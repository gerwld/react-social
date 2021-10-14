import moment from 'moment';
import { NavLink } from 'react-router-dom';
import s from './Dialogs.module.css';

const Message = ({converListUser, ...props}) => {
    var time = moment(props.addedAt, "YYYY-MM-DD-h:mm").format("hh:mm A");
    var data = moment(props.addedAt, "YYYY-MM-DD-h:mm").format("(MMM Do)");
    var isConverUser = props.senderId === parseInt(converListUser.id);
    return (
        <div key={props.id} className={s.message}>
            <NavLink to={`/profile/id${props.senderId}`}>
            {isConverUser && <img className={s.userAvatar} alt="User Avatar" src={converListUser.avatar || "/images/avatars/def-avatar.png"}/>}
            {!isConverUser && <img className={s.userAvatar} alt="Your avatar" src={false || "/images/avatars/def-avatar.png"}/>}
            </NavLink>
            <div className={s.message_content}>
            <NavLink to={`/profile/id${props.senderId}`}>
                <span className={s.user_data}>{props.senderName}</span>
            </NavLink>
                <span>{props.body}</span>
                <span className={s.message_data}>{time} <span>{data}</span></span>
            </div>
        </div>
    );
};

export default Message;