import s from './Dialogs.module.css';
import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';


const Dialogs = (props) => {
    let endDial = React.createRef();
    let onSubmit = (data) => {
        props.onSendTC(data.message);
    }

    //хук скролл вниз при отправке месседжа
    useEffect(() => {
        if (props.dialogMap) {
            return endDial.current.scrollIntoView({ behavior: "smooth" }), [props.dialogMap]
        }
    });

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
                    <MessageReduxForm onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    );
};

let MessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.messageInput}>
            <Field component="textarea" name="message" placeholder="Enter your message..." />
            <button type="submit">Send</button>
        </form>
    )
}

let MessageReduxForm = reduxForm({ form: 'dialogsForm' })(MessageForm);

export default Dialogs;