import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { setUserProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router';
import { usersAPI } from '../../api/api';



class ProfileContainerAPI extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId;
    if(!userId) {
      userId = this.props.authUserId;
    };
    this.props.setUserProfile(null);
    usersAPI.getUser(userId).then(r => {
      this.props.setUserProfile(r.data);
    });
  }


  render() {
    return (
      <Profile {...this.props} profile={this.props.profile} authUserId={this.props.authUserId} />
    )
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    authUserId: state.profilePage.authUserId
  }
}

const ProfileContainer = connect(mapStateToProps, { setUserProfile })(withRouter(ProfileContainerAPI));

export default ProfileContainer;