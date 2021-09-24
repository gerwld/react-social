import React from 'react';
import { compose } from 'redux';
import './Login.css';
import { Style } from "react-style-tag";
import { Field, reduxForm } from 'redux-form'
import { authAPI } from '../../api/api';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { userLoggedIn } from '../../redux/auth-reducer';
import { isEmailValid, requiredField, requiredFieldEmail, requiredFieldText } from '../../utils/validators/validator';
import { InputText } from '../common/FormControls/FormControls';


class Login extends React.Component {


    state = {
        showCaptcha: false,
        captchaUrl: ''
    }

    onSubmit = (fieldForm) => {
        // debugger;
        authAPI.loginInterface(fieldForm).then(r => {
            r.data.messages && r.data.messages.map(m => {
                //TODO:
                // alert(m)
            });
            if (r.data.resultCode === 0) {
                this.setState({showCaptcha: false});
                alert('Login successful.');
                this.props.userLoggedIn();
            }
            else if (r.data.resultCode === 10) {
                authAPI.getCaptcha().then(pic => {
                    this.setState({
                        showCaptcha: true,
                        captchaUrl: pic
                    })
                    
                })
            }
        })
    }

    render() {
        return (
            <div className="login_content">
                <LoginReduxForm {...this.state} onSubmit={this.onSubmit} />
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
            }`}
                </Style>
            </div>
        )
    }
}


const reduiredEmail = requiredFieldText("Please, enter your email.");
const reduiredPasswd = requiredFieldText("Password is required.");
// const reduiredCaptcha = requiredFieldText("Please enter the captcha before sending request.");
let LoginForm = (props) => {

    let isCaptchaShow = props.showCaptcha ? "captcha-visible" : "";

    return (
        <form onSubmit={props.handleSubmit}>
            <div class="form-group">
                <label for="InputEmail1">Email address</label>
                <Field component={InputText} validate={[reduiredEmail, isEmailValid]} name="email" type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email" autocomplete="email" value="free@samuraijs.com" />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="InputPassword1">Password</label>
                <Field component={InputText} validate={[reduiredPasswd]} name="password" type="password" class="form-control" id="InputPassword1" placeholder="Password" autocomplete="current-password" value="free" />
            </div>
            <div className="form-check-buttons">
                <div class="form-check">
                    <Field component="input" name="rememberMe" type="checkbox" class="form-check-input" id="rememberMeCheck" />
                    <label class="form-check-label" for="rememberMeCheck">Remember me</label>
                </div>
                <button type="submit" class="btn btn-login">Login</button>
            </div>
            <div className={`form-check-captcha ${isCaptchaShow}`}>
                <div class="captcha-img" title="CAPTCHA">
                    <img src={props.captchaUrl} alt="Captcha. Please wait." />
                </div>
                <Field  class="form-control" component={InputText} name="captcha" autocomplete="off" />
            </div>
        </form>
    )
}



let LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);


export default compose(
    connect(null, { userLoggedIn }),
    withRouter
)(Login);
