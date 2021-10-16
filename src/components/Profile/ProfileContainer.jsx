import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserInfo, setUserProfile, setUserStatus, setUserAvatar, setCurrentSettingsTC } from '../../redux/profile-reducer';
import { withRouter } from 'react-router';
import { getAuthUserDataTC } from '../../api/api';
import { change } from 'redux-form';
import { getUsersThunkCreator } from '../../redux/users-reducer';


class ProfileContainerAPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status,
      statusEditMode: false,
      isShowMore: false
    }
      this.props.getUsersThunkCreator( 1,  6, 1, true);
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

  onHandleAvatar = async (e) => {
    if (e.target.files.length) {
      this.props.setUserAvatar(e.target.files[0]);
    }
  }

  handleShowClick = () => {
    this.setState(prevState => ({
      isShowMore: !prevState.isShowMore
    }));
  }

  onSettingsChange = async (e) => {
    await this.props.setCurrentSettingsTC(e);
    this.props.history.push('/profile');
  }

  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) { userId = this.props.authUserId || this.props.history.push("/login") }
    this.props.getUserInfo(userId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status })
    }
    if (prevProps.authUserId !== this.props.authUserId && !this.props.authUserId) {
      this.props.history.push("/login");
    }
    let currentIdFromUrl = this.props.match.params.userId;
    if (currentIdFromUrl !== prevProps.match.params.userId) {
      if (currentIdFromUrl) {
        this.props.getUserInfo(currentIdFromUrl);
      } else {
        this.props.getUserInfo(this.props.authUserId);
      }
    }
  }

  render() {
    return (
      <Profile profile={this.props.profile} authUserId={this.props.authUserId} statusEditMode={this.state.statusEditMode}
        activateEdit={this.activateEditmode} deactivateEdit={this.deactivateEditmode} status={this.state.status} statusGlobal={this.props.status}
        inputValue={this.statusInputRef} editInput={this.editInput} urlUserId={this.props.match.params.userId} onHandleAvatar={this.onHandleAvatar}
        isEditMode={this.props.match.params.status === "edit_settings"} handleShowClick={this.handleShowClick} isShowMore={this.state.isShowMore}
        onSettingsSubmit={this.onSettingsChange} postDataLength={this.props.postDataLength} friendsList={this.props.friendsList}
      />
    )
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    authUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status,
    postDataLength: state.profilePage.postData.length,
    friendsList: state.usersPage.users
  }
}

export default compose(
  connect(mapStateToProps, { setUserProfile, getUserInfo, setUserStatus, getAuthUserDataTC, setUserAvatar, change, setCurrentSettingsTC, getUsersThunkCreator }),
  withRouter
)(ProfileContainerAPI)