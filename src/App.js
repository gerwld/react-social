import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import { Route } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';


const App = (props) => {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="app-content">
        <Route path="/dialogs" render={() => <DialogsContainer />} />
        <Route path="/profile/id:userId?" render={() => <ProfileContainer />} />
        <Route path="/profile" exact render={() => <ProfileContainer />} />
        <Route path="/users" render = { () => <UsersContainer />} />
      </div>
    </div>
  );
}

export default App;
