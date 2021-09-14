import React from 'react';
import './Profile.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';

import main_image from '../../img/profile.jpg';
import Preloader from '../common/Preloader/Preloader';

const Profile = (props) => {
  if (!props.profile) {
    return <Preloader />
  } else {
    let avatar = props.profile.photos;
    let avatar_check = avatar.large ? avatar.large : (avatar.small ? avatar.small : "/images/avatars/def-avatar.png");
    let isCurrentUserProfile = props.profile.userId === props.authUserId;

    return (
      <div className="profile-page">
        <div className="main-image">
          <img alt="Main Image" src={main_image}></img>
        </div>
        <div className="user-profile">
          <img alt="Avatar" className="user-profile__img" src={avatar_check}></img>
          <ul className="user-profile__info">
            <li className="user-info__name">{props.profile.fullName}</li>

            <li className="user-info__data"> 
            {isCurrentUserProfile ? <StatusEditable {...props}/> : (props.profile.aboutMe || "Status is not set.")}
            </li>

            <li className="user-info__data"><b>Date of Birth:</b> 21 February</li>
            <li className="user-info__data"><b>City:</b> Warsaw</li>
            <li className="user-info__data"><b>Education:</b> SIP Warsaw</li>
            {props.profile.contacts.vk ? <li className="user-info__data"><b>Web-site:</b> <a href={`http://${props.profile.contacts.vk}`} target="_blank">{props.profile.contacts.vk}</a></li> : null}
          </ul>
        </div>
        <MyPostsContainer />
      </div>
    );
  }
};

const StatusEditable = (props) => {
  return (
    <>
    {!props.statusEditMode && <span onClick={props.activateEdit}>{props.statusGlobal || "Status is not set."}</span>}
   {props.statusEditMode && <input onBlur={(e) => props.deactivateEdit(e.target.value)} 
                                    onChange={(e) => props.editInput(e.target.value)} type="text" value={props.status} autoFocus="true"/>}
    </>
  )
}

export default Profile;