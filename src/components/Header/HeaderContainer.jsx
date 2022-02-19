import React from 'react';
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { logoutUserTC } from '../../api/api';
import { toggleTheme } from '../../redux/app-reducer';
import s from './Header.module.css';

const HeaderContainer = ({ isAuth, logoutUserTC, isDarkTh, toggleTheme, ...props }) => {

    var isLoginPage = props.location.pathname === "/login";
    return (
        <header className={s.app_header}>
            <div className={s.header_content}>
                <NavLink to="/"><img alt="Social Network Project created by P. Jaworski"
                    title="Social Network Project created by P. Jaworski" src="/images/logo.svg" width="25px" height="auto" />
                </NavLink>
                <nav className={`${s.main_nav} main_nav`}>
                    {isAuth ?
                        <>
                        <div className={s.dark_theme_toggle}>
                            <span onClick={toggleTheme} className={s.dark_theme}>{isDarkTh ? <BsFillSunFill /> : <BsFillMoonStarsFill />}</span>
                            <span className={s.dark_popper}>{`Turn ${isDarkTh ? 'off' : 'on'} dark mode`}</span>
                        </div>
                            <span onClick={logoutUserTC}>Log Out <IoLogOutOutline /></span></> :
                       <>{!isLoginPage && <NavLink to='/login'>Login <IoLogInOutline /></NavLink>}</>}
                </nav>
            </div>
        </header>
    );
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isDarkTh: state.app.darkTheme
});


export default compose(
    connect(mapStateToProps, { logoutUserTC, toggleTheme }),
    withRouter
)(HeaderContainer);