import React from 'react';
import s from './Header.module.css';
import logo from '../../img/logo.png';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    console.log(props)
    return (
        <header className={s.app_header}>
            <img alt="Logo" src={logo} width="25px" height="auto"></img>
            <nav className={s.main_nav}>
              { props.isAuth ? <span>Welcome back, <NavLink to='/profile'>{props.data.login}</NavLink></span> : <NavLink to='/login'>Login</NavLink> }
            </nav>
        </header>
    );
}

export default Header;