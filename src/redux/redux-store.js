import { combineReducers, createStore, applyMiddleware } from "redux";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./navbar-reducer";
import profileReducer from './profile-reducer';
import usersReducer from "./users-reducer";
import authReducer from './auth-reducer';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";
import feedReducer from "./feed-reducer";

let reducers = combineReducers({
    app: appReducer,
    profilePage: profileReducer,
    messagePage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    feed: feedReducer
});


const store = createStore(reducers, applyMiddleware(thunk));

export default store;