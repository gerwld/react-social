import { Checkbox } from "@mui/material";
import React from "react";
import { NavLink } from 'react-router-dom';
import { Preloaderw_100 } from '../common/Preloader/Preloader';
import s from './Users.module.css';

let Users = (props) => {
    let isUsersAvailable = props.totalUsers >= 1;
    let allPages = props.allPages;
    const currentActive = (link) => {
        if (link === "online") return s.user_posts_ac_1;
      }

    return (
        <div className={s.users_block}>
            {isUsersAvailable ?
            <div>
            {props.isFetching ? <Preloaderw_100 /> :
                <div className={`${s.users_section} main-content-block`}>
                    <div className={`${s.user_posts_navtitle} main-content-block`}>
                        <ul className={`${s.user_posts_nav}`}>
                            <li>
                                <NavLink to={`/users`} exact activeClassName={s.active}>{props.title()}({props.totalUsers})</NavLink>
                                <span className={currentActive(props.match.params.flags)}/>
                            </li>
                            <li><NavLink to={`/users/filter=online`} activeClassName={s.active}>Users online($ct)</NavLink></li>
                        </ul>
                    </div>
                    {props.users.map(u => <div key={u.id + "_key"} className={`${s.user_block} ${u.followed ? s : s.user_unsub}`}>
                        <div className={s.user_avatar}>
                            <NavLink to={`/profile/id${u.id}`}>
                                <img alt="User Avatar" src={u.photos.small ? (`${u.photos.small}`) : (`/images/avatars/def-avatar.png`)}></img>
                            </NavLink>
                        </div>
                        <div className={s.user_mainInfo}>
                            <div className={s.user_name}><NavLink to={`/profile/id${u.id}`}>{u.name.split('_').join(' ').split('-').join(' ').split('.').join(' ')}</NavLink></div>
                            <div className={s.user_status}>{u.status}</div>
                            <div className={`${s.action_buttons} ${s.main_actions}`}><NavLink to={`/dialogs/id${u.id}`}>Write a message</NavLink> | <a>Call</a></div>
                        </div>
                        <div className={s.user_location}>{u.loc}</div>
                        <div className={`${s.action_buttons} ${s.action_user_btn}`}>
                            <a className={props.isFollowing.some(id => id === u.id) && s.disabled_link || ''} onClick={() => props.followUser(u)}>{u.followed ? "Unsubscribe" : "Subscribe"}</a>
                            <a>Block user</a><a>Add to list</a></div>

                    </div>)
                    }
                    <div className={s.pagination}>
                        <ul>
                            <li key="er4s" onClick={e => props.onPageChanged(1)} className={`${s.pag_element} ${s.pag_arrow}`}><span>«</span>first page</li>
                            <li key="erm4s" onClick={e => props.onPageChanged(props.currentPage - 1)} className={`${s.pag_element} ${s.pag_arrow}`}><span>‹</span>prevous</li>

                            {props.getPagCurrentIndexes().map(p => <li key={p + "pag"} onClick={() => props.onPageChanged(p)} className={props.currentPage === p ? s.currentPage : ''}>{p}</li>)}

                            <li key="er4ks" onClick={e => props.onPageChanged(props.currentPage + 1)} className={`${s.pag_element} ${s.pag_arrow}`}>next<span>›</span></li>
                            <li key="emr4s" onClick={e => props.onPageChanged(allPages)} className={`${s.pag_element} ${s.pag_arrow}`}>last page<span>»</span></li>
                        </ul>
                    </div>
                </div>} </div> : <div className={`${s.users_section} main-content-block`}>No users available.</div>}
            <div className={`main-content-block ${s.navbar}`}>
                <div className={s.search_block}>
                    <input type="search" placeholder="Seach users" onChange={e => props.onSearchChange(e)} value={props.searchInput} />
                    <button type="button" onClick={props.onSearchSubmit}><i className="fas fa-search"></i></button>
                </div>
                <div className={s.view_settings}>
                    <span className={s.view_settings_title}>Sort parameters:</span>
                    <label className={s.showAll}><Checkbox onClick={props.onFriendsToggle} sx={{ '& .MuiSvgIcon-root': { fontSize: 18 }, padding: 0 }} checked={!props.isOnlyFriends} /> Show all users</label>
                </div>
            </div>
        </div>
    )
}



export default Users;