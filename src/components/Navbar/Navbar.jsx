import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className={s.app_navbar}>
            <ul>
                <li key="2"><NavLink to="/profile" activeClassName={s.current}>Profile</NavLink></li>
                <li key="3"><NavLink to="/dialogs" activeClassName={s.current}>Messages</NavLink></li>
                <li key="3"><NavLink to="/users" activeClassName={s.current}>Friends</NavLink></li>
                <li key="4"><a href="#">News</a></li>
                <li key="5"><a href="#">Music</a></li>
                <li key="6"><a href="#">Settings</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;