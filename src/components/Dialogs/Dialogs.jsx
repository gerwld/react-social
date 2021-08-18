import s from './Dialogs.module.css';
import Message from './Message';
import { NavLink } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import { dialogsTextActionCreator, sendMessageActionCreator } from '../../redux/state';


//микрокомпонента для отрисовки 1 юзера
const DialogItem = (props) => {
    return <li key="1"><NavLink to={"/dialogs/id" + props.id} activeClassName={s.selected_item}>{props.name}</NavLink></li>
};

const Dialogs = (props) => {
    //часть даты ответственная за dialogs
    let messageData = props.messagePage;

    // маппинг даты со стейта в компоненты
    let dialogItems = messageData.dialogsData.map(user => <DialogItem name={user.name} id={user.id} />);
    let messageItems = messageData.messagesData.map(m => <Message content={m.m} userdata={m.userdata} userid={m.userid} />);

    //реф на textarea
    let currentMessage = React.createRef();

    let sendMessage = (e) => {
        e.preventDefault();
        props.dispatch(sendMessageActionCreator('0'));
        currentMessage.current.value = '';
    };

    let newMessageStateSaver = () => {
        let text = currentMessage.current.value;
        props.dispatch(dialogsTextActionCreator(text));
    };

    //скролл вниз при отправке месседжа
    let dialogBox = React.useRef(null);
    const scrollToBottom = () => {
        dialogBox.current.scrollIntoView({ behavior: "smooth" })
      }
    useEffect(scrollToBottom, [messageItems]);

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
                        <div ref={dialogBox} className={s.end_dial}/>
                    </div>
                    <form className={s.messageInput}>
                        <textarea ref={currentMessage} onChange={newMessageStateSaver}></textarea>
                        <input onClick={sendMessage} type="submit" value="Send"></input>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;