import React from 'react';
import './Profile.css';
import MyPosts from './MyPosts/MyPosts';

import main_image from '../../img/profile.jpg';
import avatar from '../../img/avatar.jpg';

const Profile = () => {
  return (
    <div className="profile-page">
      <img className="main-image" src={main_image}></img>
      <div className="user-profile">
        <img className="user-profile__img" src={avatar}></img>
        <ul className="user-profile__info">
          <li className="user-info__name">Anatoly K.</li>
          <li className="user-info__data">Date of Birth: 21 February</li>
          <li className="user-info__data">City: Warsaw</li>
          <li className="user-info__data">Education: SIP Warsaw</li>
          <li className="user-info__data">Web-site: habr.ru</li>
        </ul>
      </div>
      <MyPosts />
        Main content
    </div>
  );
};

export default Profile;