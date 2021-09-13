import React from 'react';
import './Login.css';
import { Style } from "react-style-tag";

let Login = (props) => {
    return (
        <div className="login_content">
            <form>
                <div class="form-group">
                    <label for="InputEmail1">Email address</label>
                    <input type="email" class="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email" autocomplete="email" value="free@samuraijs.com"/>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="InputPassword1">Password</label>
                    <input type="password" class="form-control" id="InputPassword1" placeholder="Password" autocomplete="current-password" value="free"/>
                </div>
                <div className="form-check-buttons">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="rememberMeCheck" checked />
                        <label class="form-check-label" for="rememberMeCheck">Remember me</label>
                    </div>
                    <button type="submit" class="btn btn-login">Login</button>
                </div>
            </form>
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

class LoginContainer extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Login />
        )

    }
}

export default LoginContainer;