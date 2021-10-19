import React from 'react';
import {compose} from 'redux';
import { connect } from 'react-redux';
import { logoutUserTC } from '../../api/api';
import { NavLink, withRouter } from 'react-router-dom';
import s from './Header.module.css';
import { IoLogOutOutline, IoLogInOutline } from "react-icons/io5";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { toggleTheme } from '../../redux/app-reducer';

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
                        <><span onClick={toggleTheme} className={s.dark_theme}>{isDarkTh ? <BsFillSunFill /> : <BsFillMoonStarsFill />}</span>
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