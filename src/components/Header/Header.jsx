import React from 'react';
import s from './Header.module.css';
import logo from '../../img/logo.png';
import { NavLink } from 'react-router-dom';

const Header = (props) => {

    let logOut = props.logoutUserTC;

    return (
        <header className={s.app_header}>
            <NavLink to="/"><img alt="Logo" src={logo} width="25px" height="auto"></img></NavLink>
            <nav className={`${s.main_nav} main_nav`}>
              { props.isAuth ? <span><b onClick={e => logOut()} to='/log-out'>Log Out <i className="fas fa-sign-out-alt" /></b></span> : <NavLink to='/login'>Login <i className="fas fa-sign-in-alt"></i></NavLink> }
            </nav>
        </header>
    );
}

export default Header;


