import s from './Dialogs.module.css';
import React, { useEffect } from 'react';


const Dialogs = (props) => {
    let currentMessage = React.createRef();
    let endDial = React.createRef();

    //скролл вниз при отправке месседжа
    useEffect(() => endDial.current.scrollIntoView({ behavior: "smooth" }), [props.dialogMap]);

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
                        <textarea ref={currentMessage} onChange={e => props.onInputValue(e.target.value)} placeholder="Enter your message..."></textarea>
                        <input onClick={e => {
                            e.preventDefault();
                            props.onSend(0);
                            currentMessage.current.value = '';
                        }} type="submit" value="Send"></input>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;