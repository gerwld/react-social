import React from 'react';
import s from './Users.module.css';

const Users = (props) => {

    return (
        <div>
            <span className={s.title}>Friends</span>
            <div className={s.users_section}>
                {props.users.map(u => <div key={u.id} className={s.user_block}>
                    <div className={s.user_avatar}><img src="/img1.png"></img></div>
                    <div class={s.user_mainInfo}>
                        <div className={s.user_name}>{u.name}</div>
                        <div className={s.user_status}>{u.status}</div>
                        <div className={s.action_buttons}><a>Write a message</a> | <a>Call</a></div>
                    </div>
                    <div className={s.user_location}>{u.loc}</div>
                    <div className={`${s.action_buttons} ${s.action_user_btn}`}><a>Unsubscribe</a><a>Block user</a><a>Add to list</a></div>
                    
                </div>)}
            </div>
        </div>
    )
}

export default Users;