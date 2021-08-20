import s from './Dialogs.module.css';
import React, { useEffect } from 'react';


const Dialogs = (props) => {

    //реф на textarea
    let currentMessage = React.createRef();
    let endDial = React.createRef();

    //скролл вниз при отправке месседжа
    const scrollToBottom = () => {
        endDial.current.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(scrollToBottom, [props.dialogMap]);

    return (
        <div>
            <span className={s.title}>Dialogs</span>
            <div className={s.dialogs_frame}>
                <ul className={s.userlist}>
                    {props.usersMap}

                </ul>
                <div className={s.dialog_window}>
                    <div>
                        {props.dialogMap}
                        <div ref={endDial} className={s.end_dial} />
                    </div>
                    <form className={s.messageInput}>
                        <textarea ref={currentMessage} onChange={e => props.onInputValue(e)} placeholder="Enter your message..."></textarea>
                        <input onClick={(e) => { props.onSend(e, currentMessage) }} type="submit" value="Send"></input>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;