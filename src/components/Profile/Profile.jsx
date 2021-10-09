import React from 'react';
import './Profile.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import main_image from '../../img/profile.jpg';
import Preloader from '../common/Preloader/Preloader';
import { NavLink } from 'react-router-dom';
import avatarCheck from '../../utils/validators/avatarCheck';
import { createField, InputText, Textarea } from '../common/FormControls/FormControls';
import { Field, reduxForm } from 'redux-form';



const Profile = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  else {
    return (
      <div className="profile-page">
        <div className="main-image main-content-block">
          <img alt="Main Piсture" src={main_image} />
        </div>
        <MainInfo {...props} />
        <MyPostsContainer />
      </div>);
  }
};

const MainInfo = ({ isEditMode, ...props }) => {
  var isCurrentUserProfile = props.profile.userId === props.authUserId;
  var isInactiveBtn = isCurrentUserProfile && 'inactive_btn';

  return (
    <div className="user-profile">
      {(!isEditMode && isCurrentUserProfile) && <NavLink to="/profile/status=edit_settings" className="btn__edit_profile">Edit profile <i class="far fa-edit" /></NavLink>}

      <div className="user_block user_block__1">
        <div className="avatar_block">
          <img alt="Avatar" className="user-profile__img" src={avatarCheck(props.profile.photos)} />
          {isCurrentUserProfile && <div className={`ava_buttons ${isEditMode && "avatar_edit"}`}>
            <label><input type="file" onChange={e => props.onHandleAvatar(e)} /><i class="fas fa-file-image" />Upload new avatar</label>
          </div>}
        </div>
        <div className={`contact_buttons ${isInactiveBtn}`}>
          <NavLink to={!isCurrentUserProfile && `/dialogs/id${props.urlUserId}`}>Write a message</NavLink>
          <button>Add to friends</button>
        </div>
      </div>

      <div className="user_block user_block__2 main-content-block">
        {isEditMode && <ProfileInfoFormRedux profile={props.profile} isCurrent={isCurrentUserProfile} {...props} />}
        {!isEditMode && <ProfileInfo profile={props.profile} isCurrent={isCurrentUserProfile} {...props} />}

      </div>
    </div>)
}

const ProfileInfo = ({ profile, isCurrent, handleShowClick, isShowMore, ...props }) => {
  debugger;
  return (
    <div className="profile-info__content">
      <div className="profile-info__block profile-info__block_1">
        <Contact contactTitle="" contactInfo={profile.fullName} styleClass="x2grid full-name" />
        {isCurrent ?
          <StatusEditable {...props} /> :
          (profile.aboutMe || "Status is not set.")}
      </div>
      <div className="profile-info__block profile-info__block_2">
        <b class="title">Main info</b>
        <div className="main-info__content">
          <div className="main-info__block">
            <span className="main-info__title">Friends</span>
            <span className="main-num">72</span>
          </div>
          <div className="main-info__block">
            <span className="main-info__title">Posts</span>
            <span className="main-num">3</span>
          </div>
          <div className="main-info__block">
            <span className="main-info__title">Groups</span>
            <span className="main-num">100</span>
          </div>
          <div className="main-info__block">
            <span className="main-info__title">Photos</span>
            <span className="main-num">32</span>
          </div>
        </div>
        
      </div>
      {
      isShowMore && 
      <div className="profile-info__block profile-info__block_3 profile_show">
        <b class="title">Contacts</b>
        {Object.keys(profile.contacts).map(key => <Contact key={key + (Math.random() * 10)} contactTitle={key} contactInfo={profile.contacts[key]} />)}
      </div>}
      <button onClick={handleShowClick} className="show-more_btn">{isShowMore ? "Hide" : "Show more"}</button>
    </div>
  )
}

const ProfileInfoForm = ({ profile, isCurrent, ...props }) => {
  return (
    <div className="profile-info-edit__content">
      <form>
        <div className="profile-info__block profile-info__block_1">
          {createField(profile.fullName, "name", [], InputText, "Name", { required: "true", className: "fullname_edit" })}
          {createField("", "surname", [], InputText, "Surame", { required: "true", className: "fullname_edit" })}
          {createField(props.status, "status", [], Textarea, "Status", { className: "status_edit" })}
        </div>
        <div className="profile-info__block profile-info__block_3">
          <b class="title">Contacts</b>
          {Object.keys(profile.contacts).map(key => {
            return createField(profile.contacts[key] || `http://${key}.com/`, key, [], InputText, key)
          })}
        </div>
        <button type="submit">Save changes</button>
      </form>
    </div>
  )
}


const ProfileInfoFormRedux = reduxForm({ form: "profileInfoForm" })(ProfileInfoForm);




const Contact = ({ contactTitle, contactInfo, styleClass }) => {
  return (
    <p className={`${styleClass ? styleClass : ""} profile-info__item`}>
      <b>{contactTitle}</b>
      <span className="info">{contactInfo}</span>
    </p>
  )
}


const StatusEditable = (props) => {
  return (
    <>
      {!props.statusEditMode && <span class="status_editable" onClick={props.activateEdit}>{props.statusGlobal || "Status is not set."}</span>}
      {props.statusEditMode && <input onBlur={(e) => props.deactivateEdit(e.target.value)}
        onChange={(e) => props.editInput(e.target.value)} type="text" value={props.status} autoFocus="true" />}
    </>
  )
}

export default Profile;