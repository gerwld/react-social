import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserInfo, setUserProfile, setUserStatus } from '../../redux/profile-reducer';
import { withRouter } from 'react-router';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getAuthUserDataTC } from '../../api/api';


class ProfileContainerAPI extends React.Component {
  state = {
    status: this.props.status,
    statusEditMode: false
  }

  activateEditmode = () => {
    this.setState({
      statusEditMode: true
    })
  }

  deactivateEditmode = (value) => {
    this.setState({
      statusEditMode: false
    });
    this.props.setUserStatus(value);
  }

  editInput = (value) => {
    this.setState({
      status: value
    })
  }

  componentDidMount() {
    let userId =  this.props.match.params.userId;
    if (!userId) {
    userId = this.props.authUserId || this.props.history.push("/login");
    }

    this.props.getUserInfo(userId);

  }

  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
    if (prevProps.authUserId !== this.props.authUserId && !this.props.authUserId) {
      this.props.history.push("/login");
    }
  }


  render() {
    return (
      <Profile profile={this.props.profile} authUserId={this.props.authUserId} statusEditMode={this.state.statusEditMode}
        activateEdit={this.activateEditmode} deactivateEdit={this.deactivateEditmode} status={this.state.status} statusGlobal={this.props.status} setUserStatus={this.props.setUserStatus}
        inputValue={this.statusInputRef} editInput={this.editInput} />
    )
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    authUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status,

  }
}

export default compose(
  connect(mapStateToProps, { setUserProfile, getUserInfo, setUserStatus, getAuthUserDataTC }),
  withRouter
)(ProfileContainerAPI)