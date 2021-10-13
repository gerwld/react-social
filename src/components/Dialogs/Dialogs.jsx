import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, requiredField } from '../../utils/validators/validator';
import { Textarea } from '../common/FormControls/FormControls';
import s from './Dialogs.module.css';
import { NavLink } from 'react-router-dom';
import Preloader, { DialogsPreloader } from '../common/Preloader/Preloader';
import Message from './Message';
import InfiniteScroll from 'react-infinite-scroll-component';

const Dialogs = (props) => {
    return (
        <div>
            <div className={s.dialogs_frame}>
                <div className={s.dialogs_user_section}>
                    <ul className={s.userlist}>
                        {props.isUsersLoaded ? props.usersMap : <DialogsPreloader />}
                    </ul>
                    {/* <div key="button_dialogs43ggF" className={s.btn_dialogs_scroll}><button type="button"><i className="fas fa-chevron-down"/></button></div> */}
                </div>
                {!props.idFromUrl ?
                    <SelectDialog /> :
                    <div className={s.dialog_window}>
                        <span className={s.current_dialog}><NavLink to={`/profile/id${props.converListUser.id}`} >{props.converListUser.name}</NavLink></span>

                        {props.isMessagesLoaded ?
                            <DialogsWindow {...props} /> :
                            <Preloader />}

                        <MessageReduxForm onSubmit={props.onSendMessage} />
                    </div>
                }
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
            <div className={s.scrollableWindow} id="scrollableDiv"
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
                    endMessage={<p className={s.loader_start}>Chat messages beginning.</p>}>

                    {this.props.currentDialog.map(m => <Message {...m} />)}
                </InfiniteScroll>
            </div>
        )
    }
}

const SelectDialog = () => (<div className={s.select_dialogscreen}><span>Select a chat to start messaging</span></div>);

// Form validators
const maxLength350 = maxLengthCreator(350);

let MessageForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className={s.messageInput}>
            <span className={s.add_file} title="Add a file..." alt="Add a file..."><i className="fas fa-paperclip" /></span>
            <Field component={Textarea} name="message" placeholder="Enter your message..." validate={[requiredField, maxLength350]} />
            <button type="submit"><i className="far fa-paper-plane" /></button>
        </form>
    )
}

let MessageReduxForm = reduxForm({ form: 'dialogsForm' })(MessageForm);

export default Dialogs;