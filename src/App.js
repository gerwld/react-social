import React from 'react';
import { withRouter, Redirect, Switch } from 'react-router-dom';
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
      {!props.location.pathname.match('/login') && (<Navbar />)}
      <div className="app-content">
        <Switch>
          <Route path="/users" render={() => <UsersContainer />} />
          <Route path="/dialogs" render={() => <DialogsContainer />} />

          <Route path="/profile/id:userId?" render={() => <ProfileContainer />} />
          <Route path="/profile" exact render={() => <ProfileContainer />} />

          <Route path="/login" render={() => {
            return props.isAuth === true ? <Redirect to="/profile" /> : <LoginContainer />
          }} />
          <Route path="/" exact render={() => {
            return props.isAuth === true ? <Redirect to="/profile" /> : <Redirect to="/login" />
          }} />



          <Route path='/error-404' render={() => "404 not found"} />
          <Redirect from='*' to='/error-404' />
        </Switch>
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