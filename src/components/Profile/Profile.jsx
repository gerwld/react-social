import React from 'react';
import './Profile.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import main_image from '../../img/profile.jpg';
import Preloader from '../common/Preloader/Preloader';
import { NavLink } from 'react-router-dom';



const Profile = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  else {
    return (
      <div className="profile-page">
        <div className="main-image main-content-block">
          <img alt="Main Piсture" src={main_image}></img>
        </div>
        <MainInfo {...props} />
        <MyPostsContainer />
      </div>);
  }
};

const MainInfo = (props) => {
  var avatar = props.profile.photos;
  var avatar_check = avatar.large ? avatar.large : (avatar.small ? avatar.small : "/images/avatars/def-avatar.png");
  var isCurrentUserProfile = props.profile.userId === props.authUserId;
  var isInactiveBtn = isCurrentUserProfile && 'inactive_btn';

  return (
    <div className="user-profile">
      <div className="user_block user_block__1 main-content-block">
        <img alt="Avatar" className="user-profile__img" src={avatar_check}></img>
          <div className={`contact_buttons ${isInactiveBtn}`}>
            <NavLink to={!isCurrentUserProfile && `/dialogs/id${props.urlUserId}`}>Write a message</NavLink>
            <button>Add to friends</button>
          </div>
      </div>
      <div className="user_block user_block__2 main-content-block">
        <ul className="user-profile__info">
          <li key="fgerf" className="user-info__name">{props.profile.fullName}</li>

          <li key="fgers" className="user-info__data user-info__status">
            {isCurrentUserProfile ? <StatusEditable {...props} /> : (props.profile.aboutMe || "Status is not set.")}
          </li>

          <li key="fger4" className="user-info__data"><b>Date of Birth:</b> 21 February</li>
          <li key="fgder" className="user-info__data"><b>City:</b> Warsaw</li>
          <li key="ffger" className="user-info__data"><b>Education:</b> SIP Warsaw</li>
          {props.profile.contacts.vk &&
            <li className="user-info__data"><b>Web-site:</b> <a href={`http://${props.profile.contacts.vk}`} rel="noreferrer" target="_blank">{props.profile.contacts.vk}</a></li>}
        </ul>
        <span className="showmore_btn">Show more</span>
      </div>
    </div>)
}

const StatusEditable = (props) => {
  return (
    <>
      {!props.statusEditMode && <span onClick={props.activateEdit}>{props.statusGlobal || "Status is not set."}</span>}
      {props.statusEditMode && <input onBlur={(e) => props.deactivateEdit(e.target.value)}
        onChange={(e) => props.editInput(e.target.value)} type="text" value={props.status} autoFocus="true" />}
    </>
  )
}

export default Profile;