import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/Login';
import { connect } from 'react-redux';



const App = (props) => {
  return (
    <div className="app-wrapper">
      <HeaderContainer />
      {!props.location.pathname.match('/login') && (<Navbar />) }
      <div className="app-content">
        <Route path="/users" render = { () => <UsersContainer />} />
        <Route path="/dialogs" render={() => <DialogsContainer />} />

        <Route path="/profile/id:userId?" render={() => <ProfileContainer />} />
        <Route path="/profile" exact render={() => <ProfileContainer />} />


        {props.isAuth === false && <Redirect to="/login" />}
        <Route path="/login" render = {() => {
        return props.isAuth === true ? <Redirect to="/profile" /> : <LoginContainer />
        }} />
        <Route path="/" exact render={() => {
        return props.isAuth === true ? <Redirect to="/profile" /> : <Redirect to="/login" />
        }} />
      </div>
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth
  }
}

const AppWrapper = connect(mapStateToProps, {})(withRouter(App));
export default AppWrapper;