import React from 'react'
import s from './NotFound.module.css';

export default function NotFound(props) {
    return (
        <div className={`main-content-block ${s.notFound_window}`}>
            <h1 className={s.visuallyHidden}>404 Page - Not Found.</h1>
            <div>
                <span className={s.mainTitle}>404</span>
                <p className={s.mainText}>Page not found</p>
            </div>
            <div className={s.illustration}><img src="/images/404-page.svg" alt="404"/></div>
        </div>
    )
}
