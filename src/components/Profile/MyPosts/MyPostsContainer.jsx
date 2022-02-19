import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { change, getFormValues } from 'redux-form';
import { addCommentTC } from '../../../redux/comments-reducer';
import { getAuthUserData, sendPost } from '../../../redux/profile-reducer';
import store from '../../../redux/redux-store.js';
import avatarCheck from '../../../utils/validators/avatarCheck';
import MyPosts from './MyPosts';

const mapStateToProps = (state) => {
  return {
    postData: state.profilePage.postData,
    inputValue: state.profilePage.newPostText,
    profile: state.profilePage.profile,
    authUserId: state.profilePage.authUserId,
    comments: state.comments.list,
    profile: state.profilePage.profile,
    authProfile: state.profilePage.authProfile,
    authId: state.auth.userId,
    avatarCheck: avatarCheck

  }
}

class MyPostContainer extends React.Component {

  componentDidMount() {
    if (!this.props.authProfile) {
      if (!this.props.profile || this.props.profile.userId !== this.props.authId) {
          this.props.getAuthUserData(this.props.authId);
      }
  }
  }

  addValueToMessage = async (symbol, postId) => {
    let state = store.getState();
    let message = getFormValues(postId)(state);
     if(message && message.comment.length > 0){
         this.props.change(postId, "comment", message.comment + symbol.native);
     } else {
         this.props.change(postId, "comment", symbol.native);
     }
 }

 addComment = async (data, postId) => {    
  let profile = this.props.authProfile || this.props.profile;
  let currentT = moment().format();
  let message = {
  id: `${profile.userId}_${currentT}_${Math.random() * 100}_commentId`, 
  postId: postId, 
  senderId: profile.userId, 
  avatar: profile.photos.small,
  fullName: profile.fullName, 
  text: data.comment, 
  data: currentT, 
  likes: 0
  }
  this.props.addCommentTC(message);
}

  render() {
    return(
      <MyPosts {...this.props} addValueToMessage={this.addValueToMessage} addComment={this.addComment}/>
    )
  }
}

export default compose(
  connect(mapStateToProps, { sendPost, change, addCommentTC, getAuthUserData}),
  withRouter
)(MyPostContainer);