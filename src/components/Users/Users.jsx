import React from 'react';
import s from './Users.module.css';

const Users = (props) => {

    if(props.users.length === 3) {
    props.setUsers([
        { id: 3, followed: true, name: 'Dmitry K.', loc: 'Minsk, Belarus', status: 'Im looking for someone...', avaHash: 'm14' },
        { id: 4, followed: true, name: 'Artem B.', loc: 'Ukraine, Kiev', status: 'O, hi Mark', avaHash: 'm15' },
        { id: 5, followed: true, name: 'Patryk J.', loc: 'Poland, Warsaw', status: 'Uqwemubwem Osas', avaHash: 'm1' },
        { id: 6, followed: true, name: 'Patryk J.', loc: 'Poland, Warsaw', status: 'Uqwemubwem Osas', avaHash: 'm4' }
    ]);
}

    return (
        <div>
            <span className={s.title}>Friends</span>
            <div className={s.users_section}>
                {props.users.map(u => <div key={u.id} className={`${s.user_block} ${u.followed ? s : s.user_unsub}`}>
                    <div className={s.user_avatar}><img src={`/images/avatars/avatar-${u.avaHash}.png`}></img></div>
                    <div class={s.user_mainInfo}>
                        <div className={s.user_name}>{u.name}</div>
                        <div className={s.user_status}>{u.status}</div>
                        <div className={`${s.action_buttons} ${s.main_actions}`}><a>Write a message</a> | <a>Call</a></div>
                    </div>
                    <div className={s.user_location}>{u.loc}</div>
                    <div className={`${s.action_buttons} ${s.action_user_btn}`}>
                        <a onClick={() => props.unfollowUser(u.id)}>{u.followed ? "Unsubscribe" : "Subscribe"}</a>
                        <a>Block user</a><a>Add to list</a></div>
                    
                </div>)}
            </div>
        </div>
    )
}

export default Users;