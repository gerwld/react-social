import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import { Route, BrowserRouter } from 'react-router-dom';


const App = (props) => {
  
  return (
    <BrowserRouter>
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className="app-content">
        <Route path="/dialogs" render={ () => <Dialogs users={props.dialogsData} messages={props.dialMessData} />} />
        <Route path="/profile" render={ () => <Profile data={props.profileData} />} />
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
