import React from 'react';
import './Profile.css';
import MyPosts from './MyPosts/MyPosts';

import main_image from '../../img/profile.jpg';
import avatar from '../../img/avatar.jpg';

const Profile = (props) => {
  return (
    <div className="profile-page">
      <div  className="main-image">
        <img src={main_image}></img>
      </div>
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
      <MyPosts data={props.data}/>
    </div>
  );
};

export default Profile;