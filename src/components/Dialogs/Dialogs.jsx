import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, requiredField } from '../../utils/validators/validator';
import { Textarea } from '../common/FormControls/FormControls';
import s from './Dialogs.module.css';

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
            <div className={s.dialogs_frame}>
                <ul className={s.userlist}>
                    {props.usersMap}

                </ul>
                {
                    !props.idFromUrl ?
                    <SelectDialog /> :
                        <div className={s.dialog_window}>
                        <span className={s.current_dialog}>{props.converListUser.name}</span>
                        <div>
                            {props.dialogMap}
                            <div ref={endDial} className={s.end_dial} />
                        </div>
                        <MessageReduxForm onSubmit={onSubmit} />
                    </div>
                }
            </div>
        </div>
    )
};

const SelectDialog = () => {
    return (
        <div className={s.select_dialogscreen}><span>Select dialog...</span></div>
    );
}

// Form validators
const maxLength350 = maxLengthCreator(350);

let MessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.messageInput}>
            <span className={s.add_file} title="Add a file..." alt="Add a file..."><i className="fas fa-paperclip" /></span>
            <Field component={Textarea} name="message" placeholder="Enter your message..." validate={[requiredField, maxLength350]} />
            <button type="submit"><i className="far fa-paper-plane" /></button>
        </form>
    )
}

let MessageReduxForm = reduxForm({ form: 'dialogsForm' })(MessageForm);

export default Dialogs;