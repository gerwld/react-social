import React from 'react';
import './Profile.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import main_image from '../../img/profile.jpg';
import Preloader from '../common/Preloader/Preloader';
import { NavLink } from 'react-router-dom';
import avatarCheck from '../../utils/validators/avatarCheck';
import { createField, InputText, Textarea } from '../common/FormControls/FormControls';
import { Field, reduxForm } from 'redux-form';


class Profile extends React.Component {

  render() {
    if (!this.props.profile) {
      return <Preloader />
    }
    else {
      var isCurrentUserProfile = this.props.profile.userId === this.props.authUserId;
      var isInactiveBtn = isCurrentUserProfile && 'inactive_btn';
      var isEditMode = this.props.isEditMode;
      let fullNameSplit = this.props.profile.fullName.split(/[\s,]+/);
      let nameSplitted = fullNameSplit[0];
      let surnameSplitted = fullNameSplit[1];

      return (
        <div className="profile-page">
          <div className="main-image main-content-block">
            <img alt="Main Piсture" src={main_image} />
          </div>
          <div className="user_block user_block__1">
            <div className="avatar_block">
              <img alt="Avatar" className="user-profile__img" src={avatarCheck(this.props.profile.photos)} />
              {isCurrentUserProfile && <div className={`ava_buttons ${isEditMode ? 'avatar_edit' : ''}`}>
                <label><input type="file" onChange={e => this.props.onHandleAvatar(e)} /><i class="fas fa-file-image" />Upload new avatar</label>
              </div>}
            </div>
            <div className={`contact_buttons ${isInactiveBtn}`}>
              <NavLink to={!isCurrentUserProfile && `/dialogs/id${this.props.urlUserId}`}>Write a message</NavLink>
              <button>Add to friends</button>
            </div>
          </div>

          <div className="user_block user_block__2 main-content-block">
            {(!isEditMode && isCurrentUserProfile) && <NavLink to="/profile/status=edit_settings" className="btn__edit_profile">Edit Profile <i class="far fa-edit" /></NavLink>}
            {(isEditMode && isCurrentUserProfile) && <NavLink to="/profile/" className="btn__edit_profile">Close <i class="fas fa-times down-1-px" /></NavLink>}

            {/* usual view (not edit) */}
            {!isEditMode && <ProfileInfo profile={this.props.profile} isCurrent={isCurrentUserProfile}
              isShowMore={this.props.isShowMore} handleShowClick={this.props.handleShowClick}
              statusEditMode={this.props.statusEditMode} activateEdit={this.props.activateEdit}
              statusGlobal={this.props.statusGlobal} deactivateEdit={this.props.deactivateEdit}
              status={this.props.status} editInput={this.props.editInput} />}

            {isEditMode &&
              <ProfileInfoFormRedux initialValues={{ name: nameSplitted, surname: surnameSplitted, ...this.props.profile }} onSubmit={e => this.props.onSettingsSubmit(e)} profile={this.props.profile} isCurrent={isCurrentUserProfile} />}
          </div>
          <MyPostsContainer />
        </div>
      );
    }
  }
};


const ProfileInfoForm = ({ profile, initialValues, ...props }) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {props.error && <div>{props.error}</div>}
      <div className="profile-info-edit__content">
        <div className="profile-info__block profile-info__block_1">
          {createField("Daniel", "name", [], InputText, "Name", { required: "true", className: "fullname_edit" }, 10)}
          {createField("Hecker", "surname", [], InputText, "Surame", { required: "true", className: "fullname_edit" }, 11)}
          {createField("Tell something about you...", "aboutMe", [], Textarea, "About me", { className: "status_edit" }, 300)}
        </div>

        <div className="profile-info__block profile-info__block_2">
          <b class="title">Job</b>
          <Field id="lookingAJob" component="input" name="lookingForAJob" type="checkbox" /><label className="lookingAJob_label" for="lookingAJob">Currently looking for a job</label>
          <Field component="textarea" name="lookingForAJobDescription" placeholder="Tell the world what you are good at..." className="lookingForJob_edit" />
        </div>

        <div className="profile-info__block profile-info__block_3">
          <b class="title">Contacts</b>
          {Object.keys(profile.contacts).map(key => createField(`http://${key}.com/`, "contacts." + key, [], InputText, key, {type:"url"}, 100))}
        </div>
        <button type="submit">Save changes</button>
      </div>
    </form>
  )
}
const ProfileInfoFormRedux = reduxForm({ form: "edit_profile" })(ProfileInfoForm);


const ProfileInfo = ({ profile, isCurrent, isShowMore, handleShowClick, ...props }) => {
  var isProfileContactsEmpty = Object.values(profile.contacts).every(x => x === null || x === '');
  return (
    <div className="profile-info__content">
      <div className="profile-info_def__block profile-info_def__block_1">
        <NavLink to={`/profile/id${profile.userId}`} className="full-name">{profile.fullName}</NavLink>
        <span className="profile_status">
          {isCurrent ?
            <StatusEditable {...props} /> :
            (profile.aboutMe || "Status is not set.")}
        </span>
      </div>
      <div className="profile-info__block profile-info__block_2 profile-info__block_2__1">
       {/* <b class="title">About</b> */}
      <div className="about_block">
        <span className="about_subtitle">About Me:</span>
        <span className="about_content">{profile.aboutMe}</span>
      </div>
      <div className="about_block">
        <span className="about_subtitle">Looking for a job:</span>
        <span className="about_content">{profile.lookingForAJob ? "Yes" : "No"}</span>
      </div>
      <div className="about_block">
        <span className="about_subtitle">Knowledge:</span>
        <span className="about_content">{profile.lookingForAJobDescription}</span>
      </div>
      </div>
      <div className="profile-info__block profile-info__block_2">
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
      {(isShowMore && !isProfileContactsEmpty) &&
        <div className="profile-info__block profile-info__block_3">
          <b class="title">Contacts</b>
          {Object.keys(profile.contacts).map(key => profile.contacts[key] &&
            <Contact key={key} contactTitle={key === "mainLink" ? "Other" : key} contactInfo={profile.contacts[key]} />)}
        </div>}
      {!isProfileContactsEmpty && <button onClick={handleShowClick} className="show-more_btn">{isShowMore ? "Hide" : "Show more"}</button>}
      {isProfileContactsEmpty && <div className="showmore_box" />}
    </div>
  )
}


export const Contact = ({ contactTitle, contactInfo, styleClass }) => {
  let contactLink = contactInfo.startsWith("http") ? contactInfo : "http://" + contactInfo;
  let contactLinkPretty = contactInfo.replace("www.", "").replace("http://", "").replace("https://", "");
  return (
    <p className={`${styleClass ? styleClass : ""} profile-info__item`}>
      <b>{contactTitle}</b>
      <a href={contactLink} target="_blank" className="info" rel="noreferrer">{contactLinkPretty}</a>
    </p>
  )
}

const StatusEditable = ({ statusEditMode, activateEdit, statusGlobal, deactivateEdit, status, editInput }) => {
  return (
    <>
      {!statusEditMode && <span class="status_editable" onClick={activateEdit}>{statusGlobal || "Status is not set."}</span>}
      {statusEditMode && <input onBlur={(e) => deactivateEdit(e.target.value)}
        onChange={(e) => editInput(e.target.value)} type="text" value={status} autoFocus="true" />}
    </>
  )
}

export default Profile;