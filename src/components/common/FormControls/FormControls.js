
import { React } from 'react';
import s from "./FormControls.module.css";


export const Textarea = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error && meta.submitFailed;
    return (
        <div className={s.form_control + " " + (hasError ? s.error : null)}>
                <textarea {...input} {...props} />
        </div>
    )
}

export const InputText = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={s.form_control_block + " " + (hasError ? s.error : null)}>
                <input {...input} {...props} />
                {hasError && <span>{meta.error}</span>}
        </div>
    )
}