import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { setUserProfile } from '../../redux/profile-reducer';



class ProfileContainerAPI extends React.Component {

  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/10`).then(response => {
      this.props.setUserProfile(response.data);
    });
  }


  render() {
    return (
      <Profile {...this.props} profile={this.props.profile} />
    )
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile
  }
}

const ProfileContainer = connect(mapStateToProps, { setUserProfile })(ProfileContainerAPI);

export default ProfileContainer;