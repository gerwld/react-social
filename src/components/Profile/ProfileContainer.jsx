import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { setUserProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router';



class ProfileContainerAPI extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId;
    if(!userId) {
      userId = this.props.authUserId;
    };
    debugger;
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(response => {
      this.props.setUserProfile(response.data);
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