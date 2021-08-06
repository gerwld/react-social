import React from 'react';
import s from './Header.module.css';

const Header = () => {
    return (
        <header className={s.app_header}>
            <img src="https://logodownload.org/wp-content/uploads/2020/01/vk-logo-1.png" width="25px" height="auto"></img>
        </header>
    );
}

export default Header;