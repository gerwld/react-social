import s from './Dialogs.module.css';

const Message = (props) => {
    let userPic = props.avatar ? props.avatar : "/images/avatars/def-avatar.png";
    const userdata = props.userdata ? props.userdata : "Gerwld";
    return (
        <div className={s.message}>
            <img className={s.userAvatar} alt="User Avatar" src={userPic}></img>
            <div className={s.message_content}>
                <span className={s.user_data}>{userdata}</span>
                <span>{props.content}</span>
            </div>
        </div>
    );
};

export default Message;