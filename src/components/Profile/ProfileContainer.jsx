import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserInfo, setUserProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router';



class ProfileContainerAPI extends React.Component {

  componentDidMount() {
    this.props.getUserInfo(
      this.props.match.params.userId, 
      this.props.authUserId)
  }


  render() {
    return (
      <Profile profile={this.props.profile} authUserId={this.props.authUserId} />
    )
  }
}
// {...this.props}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    authUserId: state.profilePage.authUserId
  }
}


const ProfileContainer = connect(mapStateToProps, { setUserProfile, getUserInfo })(withRouter(ProfileContainerAPI));

export default ProfileContainer;