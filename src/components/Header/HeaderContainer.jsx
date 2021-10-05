import React from 'react';
import { connect } from 'react-redux';
import { logoutUserTC } from '../../api/api';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import logo from '../../img/logo.png';

const HeaderContainer = ({ isAuth, logoutUserTC }) => {
    return (
        <header className={s.app_header}>
            <NavLink to="/"><img alt="Logo" src={logo} width="25px" height="auto"></img></NavLink>
            <nav className={`${s.main_nav} main_nav`}>
                {isAuth ?
                    <span onClick={logoutUserTC}>Log Out <i className="fas fa-sign-out-alt" /></span> :
                    <NavLink to='/login'>Login <i className="fas fa-sign-in-alt"></i></NavLink>}
            </nav>
        </header>
    );
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, { logoutUserTC })(HeaderContainer);