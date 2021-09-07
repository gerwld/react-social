import React from "react";
import s from './Preloader.module.css';
import loaderImg from '../../../img/loader.svg';

const Preloader = () => {
    return (
        <div className={s.loaderAnimation}>
            <img src={loaderImg} alt="Loading... Please wait"></img>
        </div>
    );
}

export default Preloader;