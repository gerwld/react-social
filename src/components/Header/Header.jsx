import React from 'react';
import s from './Header.module.css';
import logo from '../../img/logo.png';

const Header = () => {
    return (
        <header className={s.app_header}>
            <img alt="Logo" src={logo} width="25px" height="auto"></img>
        </header>
    );
}

export default Header;