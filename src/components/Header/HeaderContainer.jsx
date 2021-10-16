import React from 'react';
import { connect } from 'react-redux';
import { logoutUserTC } from '../../api/api';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import logo from '../../img/logo.png';

const HeaderContainer = ({ isAuth, logoutUserTC }) => {
    return (
        <header className={s.app_header}>
            <div className={s.header_content}>
            <NavLink to="/"><img alt="Social Network Project created by P. Jaworski"
                title="Social Network Project created by P. Jaworski" src="/images/logo.svg" width="25px" height="auto"/>
            </NavLink>
            <nav className={`${s.main_nav} main_nav`}>
                {isAuth ?
                    <span onClick={logoutUserTC}>Log Out <i className="fas fa-sign-out-alt" /></span> :
                    <NavLink to='/login'>Login <i className="fas fa-sign-in-alt" /></NavLink>}
            </nav>
            </div>
        </header>
    );
}

let mapStateToProps = (state) => ({ isAuth: state.auth.isAuth });

export default connect(mapStateToProps, { logoutUserTC })(HeaderContainer);