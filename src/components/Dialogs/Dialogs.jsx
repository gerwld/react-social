import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, requiredField } from '../../utils/validators/validator';
import { Textarea } from '../common/FormControls/FormControls';
import s from './Dialogs.module.css';
import { NavLink } from 'react-router-dom';
import Preloader, { DialogsPreloader } from '../common/Preloader/Preloader';
import Message from './Message';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IoMdSettings, IoIosAdd } from "react-icons/io";
import {IoSearchSharp, IoStar } from "react-icons/io5";
import {AiOutlineSend} from "react-icons/ai";



const Dialogs = ({ getLastTimeOrShowOnline, ...props }) => {
    return (
        <div>
            <div className={s.dialogs_frame}>
                <div className={s.dialogs_user_section}>

                    <ul className={s.userlist}>
                        {props.isUsersLoaded ?
                            props.loadedUsers.map(user =>
                                <li key={user.name} className={s.user_item}>
                                    <NavLink to={"/dialogs/id" + user.id} activeClassName={s.selected_item}>
                                        <img src={user.avatar} className={s.userlist_avatar} alt={s.user_name} /><span className={s.user_name}>{user.name}</span>
                                        {user.hasNewMessages && <span className={s.newMessagesCount}>{user.newMessagesCount}</span>}
                                        {getLastTimeOrShowOnline(user.lastUserActivityDate, true)}
                                    </NavLink>
                                </li>)
                        : <DialogsPreloader />}
                    </ul>
                    <div className={s.dialogs_userlist_search}>
                        <label>
                            <input type="text" placeholder="Search..."/>
                            <IoSearchSharp />
                        </label>
                            <span className={s.pinned_conv}><IoStar />17</span>
                            <span className={s.pin_conv}><IoIosAdd /></span>
                    </div>
                    
                </div>
                {!props.idFromUrl ?
                    <SelectDialog /> :
                    <div className={s.dialog_window}>
                        <span className={s.current_dialog}><NavLink to={`/profile/id${props.converListUser.id}`} >{props.converListUser.name}</NavLink>
                            <span className={s.last_seen}>{getLastTimeOrShowOnline(props.converListUser.lastUserActivityDate)}</span>
                        </span>

                        {props.isMessagesLoaded ?
                            <DialogsWindow {...props} /> :
                            <Preloader />}

                        <MessageReduxForm onSubmit={props.onSendMessage} />
                    </div>
                }
                <div className={s.dialogs_userlist_settings}>
                        <span>All conversations showed</span>
                        <IoMdSettings />
                    </div>
            </div>
        </div>
    )
};

class DialogsWindow extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props !== nextProps || this.state !== nextState);
    }

    isMoreMessagesToLoad = () => {
        let pagination = 10;
        let totalPages = Math.ceil(this.props.totalMessCount / pagination);
        return (this.props.currentPage <= totalPages);
    }

    render() {
        return (
            <div key="dialogs_window" className={s.scrollableWindow} id="scrollableDiv"
                ref={(ref) => this.messagesEndRef = ref} onScroll={this.props.onScroll}>
                <div ref={this.props.endDialogBlock} className={s.end_dial} />
                <InfiniteScroll
                    dataLength={this.props.currentDialog.length}
                    next={this.props.dialogsLoader}
                    style={{ display: 'flex', flexDirection: 'column-reverse' }}
                    inverse={true}
                    hasMore={this.isMoreMessagesToLoad()}
                    loader={<div className={s.loader_mess}><img src="/images/loader-2.svg" alt="Loading..." /></div>}
                    scrollableTarget="scrollableDiv"
                    endMessage={<p className={s.loader_start}>{this.props.currentDialog.length < 1 ? "Say \"Hi!\" to start a conversation" : "Chat messages beginning."}</p>}>

                    {this.props.currentDialog.map(m => <div key={m.id}><Message converListUser={this.props.converListUser}
                    authProfile={this.props.authProfile} {...m} /></div>)}
                </InfiniteScroll>
            </div>
        )
    }
}

const SelectDialog = () => (<div className={s.select_dialogscreen}><span>Select a chat to start messaging</span></div>);

// Form validators
const maxLength350 = maxLengthCreator(350);

let MessageForm = ({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} className={s.messageInput}>
            <span className={s.add_file} title="Add a file..." alt="Add a file..."><i className="fas fa-paperclip" /></span>
            <Field component={Textarea} name="message" placeholder="Enter your message..." validate={[requiredField, maxLength350]} />
            <button type="submit"><AiOutlineSend /></button>
        </form>
    )
}

let MessageReduxForm = reduxForm({ form: 'dialogsForm' })(MessageForm);

export default Dialogs;