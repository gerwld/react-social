import React, { useEffect, useRef } from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, requiredField } from '../../utils/validators/validator';
import { Textarea } from '../common/FormControls/FormControls';
import s from './Dialogs.module.css';
import { NavLink } from 'react-router-dom';
import Preloader from '../common/Preloader/Preloader';
import Message from './Message';
import InfiniteScroll from 'react-infinite-scroll-component';

const Dialogs = (props) => {

    return (
        <div>
            <div className={s.dialogs_frame}>
                <ul className={s.userlist}>
                    {props.usersMap}
                </ul>
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
    render() {
        return(
            <div id="scrollableDiv"  ref={(ref) => this.scrollParentRef = ref} onScroll={this.props.onScroll}
            style={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
              }}>
               <InfiniteScroll
                    dataLength={this.props.currentDialog.length}
                    next={this.props.dialogsLoader}
                    style={{ display: 'flex', flexDirection: 'column-reverse' }}
                    inverse={true} //
                    hasMore={true}
                    loader={<div className={s.loader_mess}><img src="/images/loader-2.svg" alt="Loading..."/></div>}
                    scrollableTarget="scrollableDiv">

                    {this.props.currentDialog.map(m => <Message {...m}/>)}
                </InfiniteScroll>
                <div  className={s.end_dial}/>
            </div>
        )
    }
}

const SelectDialog = () => {
    return (
        <div className={s.select_dialogscreen}><span>Select a chat to start messaging</span></div>
    );
}

// Form validators
const maxLength350 = maxLengthCreator(350);

let MessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.messageInput}>
            <span className={s.add_file} title="Add a file..." alt="Add a file..."><i className="fas fa-paperclip" /></span>
            <Field component={Textarea} name="message" placeholder="Enter your message..." validate={[requiredField, maxLength350]} />
            <button type="submit"><i className="far fa-paper-plane" /></button>
        </form>
    )
}

let MessageReduxForm = reduxForm({ form: 'dialogsForm' })(MessageForm);

export default Dialogs;