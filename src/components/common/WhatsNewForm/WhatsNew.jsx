import React from 'react'
import s from './WhatsNew.module.css'
import { useState } from 'react';
import { Field } from 'redux-form';
import { Textarea_100 } from '../FormControls/FormControls';

const WhatsNew = ({styles = '', button = '', fullWidth, ...props}) => {
    var noAvatar = "/images/avatars/def-avatar.png";
    const [fieldHeight, setHeight] = useState("45px");

    return (
        <div className={`${s.whats_new_block} ${styles} main-content-block`}>
            <div className={`${s.author_avatar} ${s.whatsnew_avatar}`}><img src={noAvatar} alt="Avatar" /></div>
            <form onSubmit={props.handleSubmit}>
                <div className={s.whatsnew_field}>
                    <Field component={Textarea_100} height={fieldHeight} name="postData" placeholder="What's going on?"
                        onFocusCapture={() => setHeight(fullWidth + 'px')} onBlur={() => setTimeout(() => setHeight("45px"), 2000)} />
                    <button className={s.clipFile} type="button"><i className="fa fa-camera"></i></button>
                </div>
                <button className={`${s.send} ${button}`} type="submit"><i className="fa fa-paper-plane"></i></button>
            </form>
        </div>)
}

export default WhatsNew;