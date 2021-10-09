import React from 'react'
import s from "./Music.module.css";

const Music = (props) => {
    return(
        <div className={s.music_content}>
            <span className={s.title}>Music</span>
            <div className={`${s.music_content_block} main-content-block`}>

            </div>
        </div>

    )
}

export default Music;