import React from 'react';
import { compose } from 'redux';
import './Login.css';
import { Style } from "react-style-tag";
import { Field, reduxForm } from 'redux-form'
import { loginUserTC } from '../../api/api';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { isEmailValid, requiredFieldText } from '../../utils/validators/validator';
import { InputText } from '../common/FormControls/FormControls';


class Login extends React.Component {

    onSubmit = (fieldForm) => {
        this.props.loginUserTC(fieldForm,
            this.props.captchaTryCount
        );
    }

    render() {
        return (
            <div className="login_content">
                <LoginReduxForm {...this.props} onSubmit={this.onSubmit} />
                <Style>{`
            .main_nav {
                display: none;
                visibility:hidden;
            }

            .app-content {
            grid-column-start: 1;
            grid-column-end: 3;
            height: 800px;
            border: 1px solid #e6e6e6;
            border-radius: 5px;
            background-color: #ffffff;
            }`}
                </Style>
            </div>
        )
    }
}


const reduiredEmail = requiredFieldText("Please, enter your email.");
const reduiredPasswd = requiredFieldText("Password is required.");

let LoginForm = (props) => {

    var isCaptchaShow = props.isCaptchaShow ? "captcha-visible" : "";
    var isFormGlobalError = props.error ? "form-error-visible" : "";

    return (
        <form onSubmit={props.handleSubmit}>
            <div class="form-group">
                <label for="InputEmail1">Email address</label>
                <Field component={InputText} validate={[reduiredEmail, isEmailValid]} name="email" type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email" autocomplete="email" />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="InputPassword1">Password</label>
                <Field component={InputText} validate={[reduiredPasswd]} name="password" type="password" class="form-control" id="InputPassword1" placeholder="Password" autocomplete="current-password" />
            </div>
            <div className={`form-check-captcha ${isCaptchaShow}`}>
                <div class="captcha-img" title="CAPTCHA">
                    <img src={props.captchaUrl} alt="Captcha. Please wait." />
                </div>
                <Field class="form-control" component={InputText} name="captcha" autocomplete="off" />
            </div>
            <div className="form-check-buttons">
                <div class="form-check">
                    <Field component="input" name="rememberMe" type="checkbox" class="form-check-input" id="rememberMeCheck" />
                    <label class="form-check-label" for="rememberMeCheck">Remember me</label>
                </div>
                <button type="submit" class="btn btn-login">Login</button>
            </div>
            <div className="form-help">
            <a href="">Forgot password?</a>
            <a href="">Sign Up</a>
            </div>
            <span className={`form-error ${isFormGlobalError}`}><i class="fas fa-exclamation-circle"></i>{props.error}</span>
        </form>
    )
}



let LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

let mapStateToProps = (state) => {
    return {
        isCaptchaShow: state.auth.isCaptchaShow,
        captchaUrl: state.auth.captchaUrl,
        captchaTryCount: state.auth.captchaTryCount
    }
}

export default compose(
    connect(mapStateToProps, { loginUserTC }),
    // withRouter
)(Login);
