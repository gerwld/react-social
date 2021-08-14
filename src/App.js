import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import { Route } from 'react-router-dom';


const App = (props) => {
  console.log(props.appState.dialMessData);
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="app-content">
        <Route path="/dialogs" render={() => <Dialogs users={props.appState.messagePage.dialogsData} messages={props.appState.messagePage.messagesData} />} />
        <Route path="/profile" render={() => <Profile data={props.appState.profilePage.postData} />} />
      </div>
    </div>
  );
}

export default App;
