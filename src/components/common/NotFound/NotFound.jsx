import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './NotFound.module.css';

export default function NotFound(props) {
    return (
        <div className={s.notFound_background}>
        <div className={s.notFound_window}>
            <h1 className={s.visuallyHidden}>404 Page - Not Found.</h1>
            <div className={s.mainBlock}>
                <span className={s.mainTitle}>404</span>
                <p className={s.mainText}>Page not found</p>
                <div className={s.nav}>
                    <NavLink to="/">Go to homepage</NavLink>
                </div>
            </div>
            <div className={s.illustration}><img src="/images/404-page.svg" alt="404"/></div>
        </div>
        </div>
        
    )
}
