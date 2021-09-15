import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserInfo, getUserStatus, setUserProfile, setUserStatus } from '../../redux/profile-reducer';
import { withRouter } from 'react-router';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { profileAPI } from '../../api/api';



class ProfileContainerAPI extends React.Component {
  statusInputRef = React.createRef();

  state = {
    status: this.props.status,
    statusEditMode: false
  }

  activateEditmode = () => {
    this.setState({
      statusEditMode: true
    })
  }

  deactivateEditmode = (userStatus) => {
    this.setState({
      statusEditMode: false
    });
    this.props.setUserStatus(userStatus);
  }

  editInput = (value) => {
    this.setState({
      status: value
    })
  }

  componentDidMount() {
    this.props.getUserInfo(
      this.props.match.params.userId,
      this.props.authUserId)
  }

  componentDidUpdate(prevProps){
    if(prevProps.status != this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }


  render() {
    return (
      <Profile profile={this.props.profile} authUserId={this.props.authUserId}  statusEditMode={this.state.statusEditMode}
       activateEdit={this.activateEditmode} deactivateEdit={this.deactivateEditmode} status={this.state.status} statusGlobal={this.props.status} setUserStatus={this.props.setUserStatus}
       inputValue={this.statusInputRef} editInput={this.editInput}/>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    authUserId: state.profilePage.authUserId,
    status: state.profilePage.status
  }
}

export default compose(
  connect(mapStateToProps, { setUserProfile, getUserInfo, setUserStatus }),
  withAuthRedirect,
  withRouter
)(ProfileContainerAPI)

// const ProfileContainer = connect(mapStateToProps, { setUserProfile, getUserInfo })(withRouter(ProfileContainerAPI));
// export default withAuthRedirect(ProfileContainer);