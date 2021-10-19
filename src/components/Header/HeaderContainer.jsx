import React from 'react';
import { connect } from 'react-redux';
import { logoutUserTC } from '../../api/api';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import {IoLogOutOutline, IoLogInOutline} from "react-icons/io5";
import {BsFillMoonStarsFill, BsFillSunFill} from "react-icons/bs";
import {HiSun} from "react-icons/hi";
import { toggleTheme } from '../../redux/app-reducer';

const HeaderContainer = ({ isAuth, logoutUserTC, isDarkTh, toggleTheme }) => {
    return (
        <header className={s.app_header}>
            <div className={s.header_content}>
            <NavLink to="/"><img alt="Social Network Project created by P. Jaworski"
                title="Social Network Project created by P. Jaworski" src="/images/logo.svg" width="25px" height="auto"/>
            </NavLink>
            <nav className={`${s.main_nav} main_nav`}>
            <span onClick={toggleTheme} className={s.dark_theme}>{isDarkTh ? <BsFillSunFill/> : <BsFillMoonStarsFill/> }</span>
                {isAuth ?
                    <span onClick={logoutUserTC}>Log Out <IoLogOutOutline /></span> :
                    <NavLink to='/login'>Login <IoLogInOutline /></NavLink>}
            </nav>
            </div>
        </header>
    );
}

let mapStateToProps = (state) => ({ 
    isAuth: state.auth.isAuth,
    isDarkTh: state.app.darkTheme
 });

export default connect(mapStateToProps, { logoutUserTC, toggleTheme })(HeaderContainer);