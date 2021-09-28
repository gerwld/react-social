import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component {

    render() {
        return (
            <nav className={s.app_navbar}>
                <ul>
                    <li key="0"><NavLink to="/profile" activeClassName={s.current}>Profile</NavLink></li>
                    <li key="1"><NavLink to="/feed" activeClassName={s.current}>News</NavLink></li>
                    <li key="2"><NavLink to="/dialogs" activeClassName={s.current}>Messages</NavLink></li>
                    <li key="3"><NavLink to="/users" activeClassName={s.current}>Friends</NavLink></li>
                    <li key="4"><NavLink to="/music" activeClassName={s.current}>Music</NavLink></li>
                    <li key="5"><NavLink to="/settings" activeClassName={s.current}>Settings</NavLink></li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;