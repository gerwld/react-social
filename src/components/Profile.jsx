import React from 'react';
import './Profile.css';

const Profile = () => {
    return(
        <div className="profile-page">
        <img className="main-image" src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"></img>
        <div className="user-profile"></div>
        <div className="user-posts">
          <div className="new-post-input"></div>
        </div>
        Main content
      </div>
    );
};

export default Profile;