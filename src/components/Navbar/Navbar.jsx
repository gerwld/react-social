import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoSettingsOutline, IoVideocamOutline, IoMusicalNotesOutline, IoPeopleOutline, IoChatbubblesOutline, IoNewspaperOutline, IoPersonOutline} from "react-icons/io5";

class Navbar extends React.Component {

    render() {
        return (
            <nav className={`${s.app_navbar}`}>
                <ul>
                    <li key="0"><NavLink to="/profile" activeClassName={s.current}><IoPersonOutline/> Profile</NavLink></li>
                    <li key="1"><NavLink to="/feed" activeClassName={s.current}><IoNewspaperOutline/> News</NavLink></li>
                    <li key="2"><NavLink to="/dialogs" activeClassName={s.current}><IoChatbubblesOutline/>
                        <span className={s.newEventCount}>{this.props.messagesCount}</span> Messages</NavLink>
                    </li>
                    <li key="3"><NavLink to="/users" activeClassName={s.current}><IoPeopleOutline/> Friends</NavLink></li>
                    <li key="4"><NavLink to="/music" activeClassName={s.current}><IoMusicalNotesOutline/> Music</NavLink></li>
                    <li key="4"><NavLink to="/video" activeClassName={s.current}><IoVideocamOutline /> Videos</NavLink></li>
                    <li key="5"><NavLink to="/settings" activeClassName={s.current}><IoSettingsOutline /> Settings</NavLink></li>
                </ul>
                <div className={s.subnav_info}>
                    <NavLink to="/profile/id19461">P. Jaworski</NavLink>
                    <a href="#">Blog</a>
                    <a target="_blank" rel="noreferrer" href="https://github.com/gerwld/Social-Network-Project#readme">About p/Jaw network</a>
                    <a target="_blank" rel="noreferrer" href="https://github.com/gerwld/">GitHub</a>
                </div>
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