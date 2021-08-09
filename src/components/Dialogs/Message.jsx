import s from './Dialogs.module.css';
import avatar from '../../img/avatar.jpg';
import avatar2 from '../../img/avatar-2.jpg';

const Message = (props) => {
    let userPic = props.userid == 1 ? avatar2 : avatar;
    const userdata = props.userdata ? props.userdata : "John Doe";
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