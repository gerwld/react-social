
import { React } from 'react';
import s from "./FormControls.module.css";
import { Field } from 'redux-form';


export const Textarea = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error && meta.submitFailed;
    return (
        <div className={s.form_control + " " + (hasError ? s.error : null)}>
                <textarea {...input} {...props} />
        </div>
    )
}

export const InputText = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error && meta.submitFailed;
    return (
        <div className={s.form_control_block + " " + (hasError ? s.error : null)}>
                <input {...input} {...props} />
                {hasError && <div><span>{meta.error}</span></div>}
        </div>
    )
}

export const createField = (placeholder, name, validators, component, label="", props={}, maxLength="1000") => (
    <label><div className="label">{label}</div>
        <Field component={component} 
        type="text"
        placeholder={placeholder}
        name={name} 
        validators={validators}
        autocomplete="off"
        maxLength={maxLength}
        {...props} 
        />
    </label>
)