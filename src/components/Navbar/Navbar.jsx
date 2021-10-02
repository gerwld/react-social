import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends React.Component {

    render() {
        return (
            <nav className={s.app_navbar}>
                <ul>
                    <li key="0"><NavLink to="/profile" activeClassName={s.current}><i class="fas fa-user"/> Profile</NavLink></li>
                    <li key="1"><NavLink to="/feed" activeClassName={s.current}><i class="fas fa-newspaper"/> News</NavLink></li>
                    <li key="2"><NavLink to="/dialogs" activeClassName={s.current}><i class="fas fa-envelope"/>
                        <span className={s.newEventCount}>{this.props.messagesCount}</span> Messages</NavLink>
                    </li>
                    <li key="3"><NavLink to="/users" activeClassName={s.current}><i class="fas fa-user-friends"/> Friends</NavLink></li>
                    <li key="4"><NavLink to="/music" activeClassName={s.current}><i class="fas fa-music"/> Music</NavLink></li>
                    <li key="5"><NavLink to="/settings" activeClassName={s.current}><i class="fa fa-gear"/> Settings</NavLink></li>
                </ul>
            </nav>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        messagesCount: state.auth.unreadMessagesCount
    }
}

export default connect(mapStateToProps, {})(Navbar);;