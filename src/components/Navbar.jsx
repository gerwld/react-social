import React from 'react';
import s from './Navbar.module.css';

const Navbar = () => {
    return (
        <navbar className={s.app_navbar}>
            <ul>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Messages</a></li>
                <li><a href="#">News</a></li>
                <li><a href="#">Music</a></li>
                <li><a href="#">Settings</a></li>
            </ul>
        </navbar>
    );
}

export default Navbar;