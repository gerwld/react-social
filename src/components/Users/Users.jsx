import React from "react";
import s from './Users.module.css';
import { NavLink } from 'react-router-dom';
import axios from "axios";

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsers / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let followUser = (user) => {
        if (!user.followed) {
            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, null, {
                withCredentials: true,
                headers: { "API-KEY": "e9327719-2998-4837-bc53-8a9b2225f057" }
            }).then(r => {
                if (r.data.resultCode === 0) {
                    props.unfollowUser(user.id);
                }
            })
        } else {
            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {
                withCredentials: true,
                headers: { "API-KEY": "e9327719-2998-4837-bc53-8a9b2225f057" }
            }).then(r => {
                if (r.data.resultCode === 0) {
                    props.unfollowUser(user.id);
                }
            })
        }

    }

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
                                <a onClick={() => followUser(u)}>{u.followed ? "Unsubscribe" : "Subscribe"}</a>
                                <a>Block user</a><a>Add to list</a></div>

                        </div>)
                    }
                    <div className={s.pagination}>
                        <ul>
                            {pages.map(p => <li onClick={() => props.onPageChanged(p)} className={props.currentPage === p && s.currentPage}>{p}</li>)}
                        </ul>
                    </div>
                    {/* <button onClick={getUsers} className={s.btn_load}>Load more...</button> */}
                </div>
            </div>
        )
    }

    export default Users;