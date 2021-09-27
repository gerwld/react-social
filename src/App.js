import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import { MainPreloader } from './components/common/Preloader/Preloader';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
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