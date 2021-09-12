import React from 'react';
import s from './Header.module.css';
import logo from '../../img/logo.png';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={s.app_header}>
            <NavLink to="/"><img alt="Logo" src={logo} width="25px" height="auto"></img></NavLink>
            <nav className={`${s.main_nav} main_nav`}>
              { props.isAuth ? <span>Welcome back, <NavLink to='/profile'>{props.data.login}</NavLink></span> : <NavLink to='/login'>Login</NavLink> }
            </nav>
        </header>
    );
}

export default Header;