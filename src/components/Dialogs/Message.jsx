import moment from 'moment';
import { NavLink } from 'react-router-dom';
import s from './Dialogs.module.css';
import {BsCheckAll} from 'react-icons/bs'


const Message = ({converListUser, authProfile, ...props}) => {
    var time = moment(props.addedAt, "YYYY-MM-DD-h:mm").format("hh:mm A");
    var data = moment(props.addedAt, "YYYY-MM-DD-h:mm").format("(MMM Do)");
    var isAuthUser = props.senderId === authProfile.userId;

    return (
        <div key={props.id} className={s.message}>
            <NavLink to={`/profile/id${props.senderId}`}>
            {isAuthUser ? 
                <img className={s.userAvatar} alt="Your avatar" src={authProfile.photos.small || "/images/avatars/def-avatar.png"}/>
            :   <img className={s.userAvatar} alt="User Avatar" src={converListUser.avatar || "/images/avatars/def-avatar.png"} />}
            </NavLink>
            <div className={s.message_content}>
            <NavLink to={`/profile/id${props.senderId}`}>
            {isAuthUser ?
                <span className={s.user_data}>{authProfile.fullName}</span>
            :   <span className={s.user_data}>{props.senderName}</span>}
            </NavLink>
                <span>{props.body}</span>
                <span className={s.message_data}>{time} <span>{data}</span></span>
                <span className={`${s.status} ${props.viewed && s.viewed}`}><BsCheckAll /></span>
            </div>
        </div>
    );
};

export default Message;