import React from 'react';
import GitHubButton from 'react-github-btn';
import { BsNewspaper } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { IoSparklesOutline } from 'react-icons/io5';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { loginUserTC } from '../../api/api';
import { toggleTheme } from '../../redux/app-reducer';
import { isEmailValid, requiredFieldText } from '../../utils/validators/validator';
import { InputText } from '../common/FormControls/FormControls';
import './Login.css';


class Login extends React.Component {
    onSubmit = (fieldForm) => {
        this.props.loginUserTC(fieldForm,
            this.props.captchaTryCount
        );
    }

    componentDidMount() {
        this.props.toggleTheme(false);
    }

    render() {
        return (
            <div className="login_block">
                <div className="present_block">
                    <h1>Connect with your friends all over the world on p/Jaw.</h1>
                    <p>Online communication has never been so convenient.<br/> Register now and you will be able to:</p>
                    <ul>
                        <li><BsNewspaper/><b>Read & Watch</b> all the latest news from<br/> primary sources.</li>
                        <li><FaUserFriends/><b>Find out</b> first about events from the life of your friends<br/> with a smart feed.</li>
                        <li><IoSparklesOutline /><b>And also</b> - scroll, like, share opinions,<br/> and much more.</li>
                    </ul>
                </div>
                <div className="login_blocks">
                    <div className="login_content main-content-block">
                        <LoginReduxForm  initialValues={{email: 'pjaworski.dev@gmail.com', password: 'qwerty12345' }} {...this.props} onSubmit={this.onSubmit} />
                    </div>
                    <div className="login_content main-content-block sign-up-block">
                        <span className="sign-up-title">On p/Jaw for the first time?</span>
                        <span className="sign-up-subtitle">Sign Up for p/Jaw</span>
                        <SignUpReduxForm {...this.props} onSubmit={this.onSubmit} />
                    </div>
                </div>
                <span className="sign_credentials">
                    <GitHubButton href="https://github.com/gerwld" aria-label="Follow @gerwld on GitHub">Follow @gerwld</GitHubButton>
                </span>
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
           
            <div className="form-group">
                <Field component={InputText} validate={[reduiredEmail, isEmailValid]} name="email" type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email" autocomplete="email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <Field component={InputText} validate={[reduiredPasswd]} name="password" type="password" className="form-control" id="InputPassword1" placeholder="Password" autocomplete="current-password" />
            </div>
            <div className={`form-check-captcha ${isCaptchaShow}`}>
                <div className="captcha-img" title="CAPTCHA">
                    <img src={props.captchaUrl} alt="Captcha. Please wait." />
                </div>
                <Field className="form-control" component={InputText} name="captcha" autocomplete="off" />
            </div>
            <div className="form-check-buttons">
                <div className="form-check">
                    <Field component="input" name="rememberMe" type="checkbox" className="form-check-input" id="rememberMeCheck" />
                    <label className="form-check-label" for="rememberMeCheck">Remember me</label>
                </div>
                <button type="submit" className="btn btn-login">Log In</button>
            </div>
            <span className={`form-error ${isFormGlobalError}`}><i className="fas fa-exclamation-circle"/>{props.error}</span>
            <div className="form-help">
                <a href="#">Forgot your password?</a>
            </div>
           
        </form>
    )
}

let SignUpForm = (props) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let getYears = () => {
        const year = new Date().getFullYear();
        return Array.from(new Array(120), (v, i) =>
            <option key={i} value={year - i}>{year - i}</option>)
    };
    let getDays = () => {
        let days = moment("2020-02", "YYYY-MM").daysInMonth();
        return Array.from(new Array(days), (v, i) =>
            <option key={i} value={days - i}>{days - i}</option>)
    };

    return (
        <form onSubmit={props.handleSubmit} className="sign-up-form">
            <div className="form-group">
                <Field component={InputText} name="us-name" className="form-control" placeholder="Your first name" autocomplete="given-name" />
            </div>
            <div className="form-group">
                <Field component={InputText} name="us-surname" className="form-control" placeholder="Your last name" autocomplete="family-name" />
            </div>

            <div className="birthday-selectors">
                <span className="title-sect">Your birthday</span>
                <select class="form-select" name="us-day">
                    <option selected>Day</option>{getDays()}
                </select>
                <select class="form-select" name="us-month">
                    <option selected disabled>Month</option>{months.map(v => <option value={v.indexOf + 1}>{v}</option>)}
                </select>
                <select class="form-select" name="us-year">
                    <option selected disabled>Year</option>{getYears()}
                </select>
            </div>
            <div className="gender-selectors">
                <span className="title-sect">Your gender</span>
                <label><input class="form-check-input" type="radio" name="us-gender" />Male</label>
                <label><input class="form-check-input" type="radio" name="us-gender" />Female</label>
            </div>
            <div className="form-check-buttons form-sign-up">
                <button disabled={true} className="btn btn-sign-up">Continue registration</button>
            </div>

            <span className={`form-error`}><i className="fas fa-exclamation-circle"></i>{props.error}</span>
        </form>
    )
}

let SignUpReduxForm = reduxForm({ form: 'signUpForm' })(SignUpForm);
let LoginReduxForm = reduxForm({ form: 'login',enableReinitialize : true })(LoginForm);

let mapStateToProps = (state) => {
    return {
        isCaptchaShow: state.auth.isCaptchaShow,
        captchaUrl: state.auth.captchaUrl,
        captchaTryCount: state.auth.captchaTryCount
    }
}

export default compose(
    connect(mapStateToProps, { loginUserTC, toggleTheme }),
)(Login);