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
import {compose} from 'redux'
import { MainPreloader } from './components/common/Preloader/Preloader';
import { initializeApp } from './redux/app-reducer';



class App extends React.Component {

  componentDidMount(){
    this.props.initializeApp();
}

  render() {
    if(!this.props.initialized) {
      return <MainPreloader />
    } 
    return (<div className="app-wrapper">
      <HeaderContainer />
      {!this.props.location.pathname.match('/login') && <Navbar />}
      <div className="app-content">
        <Switch>
          <Route path="/users" render={() => <UsersContainer />} />
          <Route path="/dialogs" render={() => <DialogsContainer />} />

          <Route path="/profile/id:userId?" render={() => <ProfileContainer />} />
          <Route path="/profile" exact render={() => <ProfileContainer />} />
          
          <Route path="/login" render={() => {
            return this.props.isAuth ? <Redirect to="/profile" /> : <LoginContainer />;
          }} />
          <Route path="/" exact render={() => {
            return this.props.isAuth === true ? <Redirect to="/profile" /> : <Redirect to="/login" />;
          }} />

          <Route path='/error-404' render={() => "404 not found"} />
          <Redirect from='*' to='/error-404' />
        </Switch>
      </div>
    </div>);
  }

}

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    initialized: state.app.initialized
  }
}

export default compose(
  connect(mapStateToProps, {initializeApp}),
  withRouter
)(App);