import React from "react";
import s from './Users.module.css';
import { NavLink } from 'react-router-dom';
import * as axios from 'axios';

class Users extends React.Component {

    getUsers = () => {
        axios.get('https://social-network.samuraijs.com/api/1.0/users?count=4&page=1').then(response => {
            this.props.setUsers(response.data.items);
        });
    }

    render() {
        return (
            <div>
                <span className={s.title}>Friends</span>
                <div className={s.users_section}>
                    {this.props.users.map(u => <div key={u.id} className={`${s.user_block} ${u.followed ? s : s.user_unsub}`}>
                        <div className={s.user_avatar}><img src={u.avaHash ? (`/images/avatars/avatar-${u.avaHash}.png`) : (`/images/avatars/def-avatar.png`)}></img></div>
                        <div class={s.user_mainInfo}>
                            <div className={s.user_name}>{u.name}</div>
                            <div className={s.user_status}>{u.status}</div>
                            <div className={`${s.action_buttons} ${s.main_actions}`}><NavLink to={`/dialogs/id${u.id}`}>Write a message</NavLink> | <a>Call</a></div>
                        </div>
                        <div className={s.user_location}>{u.loc}</div>
                        <div className={`${s.action_buttons} ${s.action_user_btn}`}>
                            <a onClick={() => this.props.unfollowUser(u.id)}>{u.followed ? "Unsubscribe" : "Subscribe"}</a>
                            <a>Block user</a><a>Add to list</a></div>

                    </div>)}
                    <button onClick={this.getUsers} className={s.btn_load}>Load more...</button>
                </div>
            </div>
        )
    }
}

export default Users;