import React from 'react';
import { compose } from 'redux';
import './Login.css';
import { Style } from "react-style-tag";
import { Field, reduxForm } from 'redux-form'
import { authAPI } from '../../api/api';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { userLoggedIn } from '../../redux/auth-reducer';


class Login extends React.Component {

    onSubmit = (fieldForm) => {
        authAPI.loginInterface(fieldForm).then(r => {
            r.data.messages && r.data.messages.map(m => alert(m));
            if (r.data.resultCode === 0) {
                alert('Login successful.');
                this.props.userLoggedIn();
            }
        });
    }
    render() {
        return (
            <div className="login_content">
                <LoginReduxForm onSubmit={this.onSubmit} />
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

let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div class="form-group">
                <label for="InputEmail1">Email address</label>
                <Field component="input" name="email" type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email" autocomplete="email" value="free@samuraijs.com" />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="InputPassword1">Password</label>
                <Field component="input" name="password" type="password" class="form-control" id="InputPassword1" placeholder="Password" autocomplete="current-password" value="free" />
            </div>
            <div className="form-check-buttons">
                <div class="form-check">
                    <Field component="input" name="rememberMe" type="checkbox" class="form-check-input" id="rememberMeCheck" />
                    <label class="form-check-label" for="rememberMeCheck">Remember me</label>
                </div>
                <button type="submit" class="btn btn-login">Login</button>
            </div>
        </form>
    )
}



let LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);


export default compose(
    connect(null, {userLoggedIn}),
    withRouter
)(Login);
