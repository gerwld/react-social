import React from 'react';
import './Profile.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';

import main_image from '../../img/profile.jpg';
import avatar from '../../img/avatar.jpg';

const Profile = (props) => {
  return (
    <div className="profile-page">
      <div className="main-image">
        <img alt="Main Image" src={main_image}></img>
      </div>
      <div className="user-profile">
        <img alt="Avatar" className="user-profile__img" src={avatar}></img>
        <ul className="user-profile__info">
          <li className="user-info__name">Anatoly K.</li>
          <li className="user-info__data">Date of Birth: 21 February</li>
          <li className="user-info__data">City: Warsaw</li>
          <li className="user-info__data">Education: SIP Warsaw</li>
          <li className="user-info__data">Web-site: habr.ru</li>
        </ul>
      </div>
      <MyPostsContainer store={props.store}/>
    </div>
  );
};

export default Profile;