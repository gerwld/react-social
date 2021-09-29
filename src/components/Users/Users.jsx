import React from "react";
import { NavLink } from 'react-router-dom';
import s from './Users.module.css';
import { Form, reduxForm, Field } from 'redux-form';

let Users = (props) => {

    return (
        <div className={s.users_block}>
            <span className={s.title}>Friends({props.totalUsers})</span>
            <div className={s.users_section}>
                {
                    props.users.map(u => <div key={u.id} className={`${s.user_block} ${u.followed ? s : s.user_unsub} main-content-block`}>
                        <div className={s.user_avatar}>
                            <NavLink to={`/profile/id1${u.id}`}>
                                <img src={u.photos.small ? (`${u.photos.small}`) : (`/images/avatars/def-avatar.png`)}></img>
                            </NavLink>
                        </div>
                        <div className={s.user_mainInfo}>
                            <div className={s.user_name}><NavLink to={`/profile/id${u.id}`}>{u.name}</NavLink></div>
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
                        <li key="er4s" onClick={e => props.onPageChanged(1)} className={`${s.pag_element} ${s.pag_arrow}`}><span>«</span>first page</li>
                        <li key="erm4s" onClick={e => props.onPageChanged(props.currentPage - 1)} className={`${s.pag_element} ${s.pag_arrow}`}><span>‹</span>prevous</li>

                        {props.getPagCurrentIndexes().map(p => <li onClick={() => props.onPageChanged(p)} className={props.currentPage === p && s.currentPage}>{p}</li>)}

                        <li key="er4ks" onClick={e => props.onPageChanged(props.currentPage + 1)} className={`${s.pag_element} ${s.pag_arrow}`}>next<span>›</span></li>
                        <li key="emr4s" onClick={e => props.onPageChanged(props.allPages)} className={`${s.pag_element} ${s.pag_arrow}`}>last page<span>»</span></li>
                    </ul>
                </div>
            </div>
            <div className={`main-content-block ${s.navbar}`}>
                <label><input type="checkbox" onClick={props.onFriendsToggle} checked={props.isOnlyFriends}/> Show all users</label>
            </div>
        </div>
    )
}



export default Users;