import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { loginUserTC } from '../../api/api';
import { toggleTheme } from '../../redux/app-reducer';
import { isEmailValid, requiredFieldText } from '../../utils/validators/validator';
import { InputText } from '../common/FormControls/FormControls';
import './Login.css';
import {BsNewspaper} from 'react-icons/bs'
import {FaUserFriends} from 'react-icons/fa'
import {IoSparklesOutline} from 'react-icons/io5'


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
                    <h1>Общайся со своими друзьями по всему миру на p/Jaw.</h1>
                    <p>Общение в сети еще никогда не было настолько удобным. Зарегистрируйся прямо сейчас и ты сможешь:</p>
                    <ul>
                        <li><BsNewspaper/><b>Просматривать</b> последние новости из первых источников.</li>
                        <li><FaUserFriends/><b>Узнавать</b> первым о событиях из жизни друзей с помощью умной ленты.</li>
                        <li><IoSparklesOutline /><b>А так же</b> - скроллить, лайкать, делится мнением и многое другое.</li>
                    </ul>
                </div>
                <div className="login_blocks">
                    <div className="login_content main-content-block">
                        <LoginReduxForm {...this.props} onSubmit={this.onSubmit} />
                    </div>
                    <div className="login_content main-content-block sign-up-block">
                        <span className="sign-up-title">On p/Jaw for the first time?</span>
                        <span className="sign-up-subtitle">Sign Up for p/Jaw</span>
                        <SignUpReduxForm {...this.props} onSubmit={this.onSubmit} />
                    </div>
                </div>
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
            <div className="form-help">
                <a href="#">Forgot your password?</a>
            </div>
            <span className={`form-error ${isFormGlobalError}`}><i className="fas fa-exclamation-circle"></i>{props.error}</span>
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
                <button type="submit" className="btn btn-sign-up">Continue registration</button>
            </div>

            <span className={`form-error`}><i className="fas fa-exclamation-circle"></i>{props.error}</span>
        </form>
    )
}



let SignUpReduxForm = reduxForm({ form: 'signUpForm' })(SignUpForm);
let LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

let mapStateToProps = (state) => {
    return {
        isCaptchaShow: state.auth.isCaptchaShow,
        captchaUrl: state.auth.captchaUrl,
        captchaTryCount: state.auth.captchaTryCount
    }
}

export default compose(
    connect(mapStateToProps, { loginUserTC, toggleTheme }),
    // withRouter
)(Login);