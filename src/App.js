import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import { MainPreloader } from './components/common/Preloader/Preloader';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/Login';
import MusicContainer from './components/Music/MusicContainer';
import Navbar from './components/Navbar/Navbar';
import NewsContainer from './components/News/NewsContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import SettingsContainer from './components/Settings/SettingsContainer';
import UsersContainer from './components/Users/UsersContainer';
import { initializeApp } from './redux/app-reducer';
import NotFound from './components/common/NotFound/NotFound';



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
          <Route path="/dialogs/id:userId?" render={() => <DialogsContainer />} />
          <Route path="/dialogs" exact render={() => <DialogsContainer />} />
          <Route path="/feed" render={() => <NewsContainer />} />
          <Route path="/settings" render={() => <SettingsContainer />} />
          <Route path="/music" render={() => <MusicContainer />} />

          <Route path="/profile/id:userId?" render={() => <ProfileContainer />} />
          <Route path="/profile" exact render={() => <ProfileContainer />} />
          
          <Route path="/login" render={() => {
            return this.props.isAuth ? <Redirect to="/profile" /> : <LoginContainer />;
          }} />
          <Route path="/" exact render={() => {
            return this.props.isAuth === true ? <Redirect to="/profile" /> : <Redirect to="/login" />;
          }} />

          <Route path='/error-404' render={() => <NotFound />} />
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