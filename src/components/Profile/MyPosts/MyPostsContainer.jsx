import React from 'react';
import { connect } from 'react-redux';
import MyPosts from './MyPosts';
import { sendPost } from '../../../redux/profile-reducer';
import avatarCheck from '../../../utils/validators/avatarCheck';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import store from '../../../redux/redux-store.js'
import { getFormValues, change } from 'redux-form';

const mapStateToProps = (state) => {
  return {
    postData: state.profilePage.postData,
    inputValue: state.profilePage.newPostText,
    profile: state.profilePage.profile,
    authUserId: state.profilePage.authUserId,
    avatarCheck: avatarCheck

  }
}

class MyPostContainer extends React.Component {
  addValueToMessage = async (symbol, postId) => {
    let state = store.getState();
    let message = getFormValues(postId)(state);
     if(message && message.comment.length > 0){
         this.props.change(postId, "comment", message.comment + symbol.native);
     } else {
         this.props.change(postId, "comment", symbol.native);
     }
 }

  render() {
    return(
      <MyPosts {...this.props} addValueToMessage={this.addValueToMessage}/>
    )
  }
}

export default compose(
  connect(mapStateToProps, { sendPost, change }),
  withRouter
)(MyPostContainer);