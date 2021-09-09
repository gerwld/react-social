import React from "react";
import s from './Users.module.css';
import { NavLink } from 'react-router-dom';

let Users = (props) => {
        return (
            <div>
                <span className={s.title}>Friends({props.totalUsers})</span>
                <div className={s.users_section}>
                    {
                        props.users.map(u => <div key={u.id} className={`${s.user_block} ${u.followed ? s : s.user_unsub}`}>
                            <div className={s.user_avatar}>
                                <NavLink to={`/profile/id1${u.id}`}>
                                    <img src={u.photos.small ? (`${u.photos.small}`) : (`/images/avatars/def-avatar.png`)}></img>
                                </NavLink>
                            </div>
                            <div class={s.user_mainInfo}>
                                <div className={s.user_name}><NavLink to={`/profile/id1${u.id}`}>{u.name}</NavLink></div>
                                <div className={s.user_status}>{u.status}</div>
                                <div className={`${s.action_buttons} ${s.main_actions}`}><NavLink to={`/dialogs/id${u.id}`}>Write a message</NavLink> | <a>Call</a></div>
                            </div>
                            <div className={s.user_location}>{u.loc}</div>
                            <div className={`${s.action_buttons} ${s.action_user_btn}`}>
                                <a className={props.isFollowing.some(id => id === u.id) && s.disabled_link} onClick={() => props.followUser(u)}>{u.followed ? "Unsubscribe" : "Subscribe"}</a>
                                <a>Block user</a><a>Add to list</a></div>

                        </div>)
                    }
                    <div className={s.pagination}>
                        <ul>
                            {props.getPages().map(p => <li onClick={() => props.onPageChanged(p)} className={props.currentPage === p && s.currentPage}>{p}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    export default Users;