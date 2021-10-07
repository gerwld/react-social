import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader, { MainPreloader } from './components/common/Preloader/Preloader';
import Navbar from './components/Navbar/Navbar';
import { initializeApp } from './redux/app-reducer';
import NotFound from './components/common/NotFound/NotFound';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/redux-store';
import { Provider } from 'react-redux';
import SettingsContainer from './components/Settings/SettingsContainer';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import MusicContainer from './components/Music/MusicContainer';


const LoginContainer = React.lazy(() => import('./components/Login/Login'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const NewsContainer = React.lazy(() => import('./components/News/NewsContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));



class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <MainPreloader />
    }
    return (<div className="app-wrapper">
      <HeaderContainer />
      {!this.props.location.pathname.match('/login') && !this.props.location.pathname.match('/error-404') && <Navbar />}
      <div className="app-content">
        <Switch>

          <Route path="/users" render={() => <UsersContainer />} />
          <Route path="/dialogs/id:userId?" render={() => <DialogsContainer />} />
          <Route path="/dialogs" exact render={() => {
            return (
              <Suspense fallback={<Preloader />}>
                <DialogsContainer />
              </Suspense>)
            }} />
          <Route path="/feed" render={() => <Suspense fallback={<Preloader />}><NewsContainer /></Suspense>} />
          <Route path="/profile/id:userId?" render={() => <Suspense fallback={<Preloader />}><ProfileContainer /></Suspense>} />
          <Route path="/profile" exact render={() => <Suspense fallback={<Preloader />}><ProfileContainer /></Suspense>} />

          <Route path="/settings" render={() => <SettingsContainer />} />
          <Route path="/music" render={() => <MusicContainer />} />

          <Route path="/login" render={() => {
            return this.props.isAuth ? <Redirect to="/profile" /> : <Suspense fallback={<Preloader />}><LoginContainer /></Suspense>;
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

const AppContainer = compose(
  connect(mapStateToProps, { initializeApp }),
  withRouter
)(App);

let SocialNetworkAppJawo = (props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </Provider>
  );
}

export default SocialNetworkAppJawo;