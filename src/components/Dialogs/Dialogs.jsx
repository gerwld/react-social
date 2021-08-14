import s from './Dialogs.module.css';
import Message from './Message';
import { NavLink } from 'react-router-dom';
import React from 'react';

const DialogItem = (props) => {
    return (
        <li key="1"><NavLink to={"/dialogs/id" + props.id} activeClassName={s.selected_item}>{props.name}</NavLink></li>
    );
};

const Dialogs = (props) => {

    let dialogItems = props.users.map(user => <DialogItem name={user.name} id={user.id} />);
    let messageItems = props.messages.map(m => <Message content={m.m} userdata={m.userdata} userid={m.userid} />);

    let currentMessage = React.createRef();
    let sendMessage = (e) => {
        e.preventDefault();
        alert(currentMessage.current.value);
    };

    return (
        <div>
            <span className={s.title}>Dialogs</span>
            <div className={s.dialogs_frame}>
                <ul className={s.userlist}>
                    {dialogItems}

                </ul>
                <div className={s.dialog_window}>
                    <div>
                        {messageItems}
                    </div>
                    <form className={s.messageInput}>
                        <textarea ref={currentMessage}></textarea>
                        <input onClick={sendMessage} type="submit" value="Send"></input>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;