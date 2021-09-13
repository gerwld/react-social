import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserInfo, setUserProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';



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

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    authUserId: state.profilePage.authUserId
  }
}

export default compose(
  connect(mapStateToProps, { setUserProfile, getUserInfo }),
  withAuthRedirect,
  withRouter
)(ProfileContainerAPI)

// const ProfileContainer = connect(mapStateToProps, { setUserProfile, getUserInfo })(withRouter(ProfileContainerAPI));
// export default withAuthRedirect(ProfileContainer);