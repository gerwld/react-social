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
    let avatar_check = avatar.large ? avatar.large : (avatar.small ? avatar.small :  "/images/avatars/def-avatar.png");
  return (
    <div className="profile-page">
      <div className="main-image">
        <img alt="Main Image" src={main_image}></img>
      </div>
      <div className="user-profile">
        <img alt="Avatar" className="user-profile__img" src={avatar_check}></img>
        <ul className="user-profile__info">
          <li className="user-info__name">{props.profile.fullName}</li>
          {props.profile.aboutMe ? <li className="user-info__data">{props.profile.aboutMe}</li> : null}
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

export default Profile;