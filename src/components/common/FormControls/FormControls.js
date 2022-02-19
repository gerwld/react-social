
import { React } from 'react';
import { Field } from 'redux-form';
import s from "./FormControls.module.css";


export const Textarea = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error && meta.submitFailed;
    return (
        <div className={s.form_control + " " + (hasError ? s.error : null)}>
                <textarea {...input} {...props} />
        </div>
    )
}

export const Textarea_100 = ({ input, meta, height, ...props }) => {
    const hasError = meta.touched && meta.error && meta.submitFailed;
    return (
        <div className={s.form_control + " " + (hasError ? s.error : null)}>
                <textarea style={{height: height}} {...input} {...props} />
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
    <label key={name}><div className="label">{label}</div>
        <Field component={component} 
        type="text"
        placeholder={placeholder}
        name={name} 
        validators={validators}
        autoComplete="off"
        maxLength={maxLength}
        {...props} 
        />
    </label>
)