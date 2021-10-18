import React from 'react';
import './Profile.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Preloader from '../common/Preloader/Preloader';
import { NavLink } from 'react-router-dom';
import avatarCheck from '../../utils/validators/avatarCheck';
import { createField, InputText, Textarea } from '../common/FormControls/FormControls';
import { Field, reduxForm } from 'redux-form';
import { BiHistory} from "react-icons/bi";
import { IoMdStats} from "react-icons/io";

class Profile extends React.Component {

  render() {
    if (!this.props.profile) {
      return <Preloader />
    }
    else {
      var isAuthProfile = this.props.profile.userId === this.props.authUserId;
      var isEditMode = this.props.isEditMode;
      let fullNameSplit = this.props.profile.fullName.split(/[\s,]+/);

      return (
        <div className="profile-page">
          <div className="user_block user_block__1">
            <div className="subblock_1 main-content-block">
              <div className="avatar_block">
                <img alt="Avatar" className="user-profile__img" src={avatarCheck(this.props.profile.photos)} />
                {isAuthProfile && <div className={`ava_buttons ${isEditMode ? 'avatar_edit' : ''}`}>
                  <label><input type="file" onChange={e => this.props.onHandleAvatar(e)} /><i className="fas fa-file-image" />Upload new avatar</label>
                </div>}
              </div>
              <div className={'contact_buttons'}>
                {isAuthProfile ?
                  <div>
                    <NavLink to={`/profile/status=edit_settings`}><button>Edit profile</button></NavLink>
                    <NavLink to={`/profile/status=page_memo`}><button className="sub_btn_transparent"><BiHistory />Memories</button></NavLink>
                    <NavLink to={`/profile/status=page_stats`}><button className="sub_btn_transparent last"><IoMdStats />Page statistics</button></NavLink>
                  </div> :
                  <div>
                    <NavLink to={`/dialogs/id${this.props.urlUserId}`}><button>Write a message</button></NavLink>
                    <button>Add to friends</button>
                  </div>}
              </div>
            </div>
            <div className="subblock_2 main-content-block">
              <span className="subblock_2_title">Friends(72)</span>
              <ul className="friends_last">
                {this.props.friendsList.map(u => {
                  return <li><NavLink to={`/profile/id${u.id}`}><div className="user_ava"><img src={avatarCheck(u.photos)} alt={u.name} /></div>
                    <span className="user_name">{u.name.split(' ')[0].split('_')[0].split('-')[0]}</span></NavLink></li>
                })}
              </ul>
            </div>
          </div>

          <div className="user_block user_block__2 main-content-block">
            {(!isEditMode && isAuthProfile) && <NavLink to="/profile/status=edit_settings" className="btn__edit_profile">Edit Profile <i className="far fa-edit" /></NavLink>}
            {(isEditMode && isAuthProfile) && <NavLink to="/profile/" className="btn__edit_profile">Close <i className="fas fa-times down-1-px" /></NavLink>}

            {/* usual view (not edit) */}
            {!isEditMode && <ProfileInfo profile={this.props.profile} isCurrent={isAuthProfile}
              isShowMore={this.props.isShowMore} handleShowClick={this.props.handleShowClick}
              statusEditMode={this.props.statusEditMode} activateEdit={this.props.activateEdit}
              statusGlobal={this.props.statusGlobal} deactivateEdit={this.props.deactivateEdit}
              status={this.props.status} editInput={this.props.editInput} postDataLength={this.props.postDataLength} />}

            {isEditMode &&
              <ProfileInfoFormRedux initialValues={{ name: fullNameSplit[0], surname: fullNameSplit[1], ...this.props.profile }} onSubmit={e => this.props.onSettingsSubmit(e)} profile={this.props.profile} isCurrent={isAuthProfile} />}
          </div>
          <MyPostsContainer avatar={avatarCheck(this.props.profile.photos)} fullName={this.props.profile.fullName} />
        </div>
      );
    }
  }
};


const ProfileInfoForm = ({ profile, initialValues, ...props }) => {
  return (
    <form key="profileInfoForm" onSubmit={props.handleSubmit}>
      {props.error && <div>{props.error}</div>}
      <div className="profile-info-edit__content">
        <div className="profile-info__block profile-info__block_1">
          {createField("Daniel", "name", [], InputText, "Name", { required: true, className: "fullname_edit" }, 10)}
          {createField("Hecker", "surname", [], InputText, "Surame", { required: true, className: "fullname_edit" }, 11)}
          {createField("Tell something about you...", "aboutMe", [], Textarea, "About me", { className: "status_edit" }, 300)}
        </div>

        <div className="profile-info__block profile-info__block_2">
          <b className="title">Job</b>
          <Field id="lookingAJob" component="input" name="lookingForAJob" type="checkbox" /><label className="lookingAJob_label" htmlFor="lookingAJob">Currently looking for a job</label>
          <Field component="textarea" name="lookingForAJobDescription" placeholder="Tell the world what you are good at..." className="lookingForJob_edit" />
        </div>

        <div className="profile-info__block profile-info__block_3">
          <b className="title">Contacts</b>
          {Object.keys(profile.contacts).map(key => createField(`http://${key}.com/`, "contacts." + key, [], InputText, key, { type: "url" }, 100))}
        </div>
        <button type="submit">Save changes</button>
      </div>
    </form>
  )
}
const ProfileInfoFormRedux = reduxForm({ form: "edit_profile" })(ProfileInfoForm);


const ProfileInfo = ({ profile, isCurrent, isShowMore, handleShowClick, postDataLength, ...props }) => {
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
        <div className="about_block">
          <span className="about_subtitle">About Me:</span>
          <span className="about_content">{profile.aboutMe || "About me section is empty."}</span>
        </div>
        <div className="about_block">
          <span className="about_subtitle">Looking for a job:</span>
          <span className="about_content">{profile.lookingForAJob ? "Yes" : "No"}</span>
        </div>
        <div className="about_block">
          <span className="about_subtitle">Knowledge:</span>
          <span className="about_content">{profile.lookingForAJobDescription || 'Looking for a job section is empty.'}</span>
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
            <span className="main-num">{postDataLength || "3"}</span>
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
          <b className="title">Contacts</b>
          {Object.keys(profile.contacts).map(key => profile.contacts[key] &&
            <Contact key={key} contactTitle={key === "mainLink" ? "Other" : key} contactInfo={profile.contacts[key]} />)}
        </div>}
      {!isProfileContactsEmpty && <button onClick={handleShowClick} className="show-more_btn">{isShowMore ? "Hide" : "Show more"}</button>}
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
      {!statusEditMode && <span className="status_editable" onClick={activateEdit}>{statusGlobal || "Status is not set."}</span>}
      {statusEditMode && <input onBlur={(e) => deactivateEdit(e.target.value)}
        onChange={(e) => editInput(e.target.value)} type="text" value={status} autoFocus="true" />}
    </>
  )
}

export default Profile;