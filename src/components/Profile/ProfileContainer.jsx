import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserInfo, setUserProfile, setUserStatus } from '../../redux/profile-reducer';
import { withRouter } from 'react-router';
import { authAPI } from '../../api/api';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


class ProfileContainerAPI extends React.Component {
  state = {
    status: this.props.status,
    statusEditMode: false,
    authUserId: this.props.authUserId
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

  loadContent = () => {
    authAPI.getAuth().then(r => {
      if (r.resultCode === 0) {
        this.props.getUserInfo(
          this.props.match.params.userId,
          r.data.id)

        this.setState({authUserId: r.data.id})
      }
    });
  }

  componentDidMount() {
    this.loadContent();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.status != this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
// TODO:
    // if(prevProps.match.params.userId !== this.state.authUserId) {
    // } else {
    // }
    // console.log(this.props.match.params.userId + ` params`);
    // console.log(prevProps.match.params.userId + ` prev params`);
    // console.log(this.state.authUserId + ` state`);
  }


  render() {
    return (
      <Profile profile={this.props.profile} authUserId={this.state.authUserId} statusEditMode={this.state.statusEditMode}
        activateEdit={this.activateEditmode} deactivateEdit={this.deactivateEditmode} status={this.state.status} statusGlobal={this.props.status} setUserStatus={this.props.setUserStatus}
        inputValue={this.statusInputRef} editInput={this.editInput} />
    )
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    authUserId: state.auth.userId,
    status: state.profilePage.status
  }
}

export default compose(
  connect(mapStateToProps, { setUserProfile, getUserInfo, setUserStatus }),
  withAuthRedirect,
  withRouter
)(ProfileContainerAPI)