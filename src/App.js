import React from 'react';
import { withRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';


const App = (props) => {
  console.log(props)
  return (
    <div className="app-wrapper">
      <HeaderContainer />
      {!props.location.pathname.match('/login') && (<Navbar />) }
      <div className="app-content">
        
        <Route path="/profile/id:userId?" render={() => <ProfileContainer />} />
        <Route path="/profile" exact render={() => <ProfileContainer />} />
        <Route path="/" exact render={() => <ProfileContainer />} />
        
        <Route path="/users" render = { () => <UsersContainer />} />
        <Route path="/dialogs" render={() => <DialogsContainer />} />
        <Route path="/login" render = {() => <Login />} />
      </div>
    </div>
  );
}

const AppWrapper = withRouter(App);
export default AppWrapper;