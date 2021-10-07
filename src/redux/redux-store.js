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
import { composeWithDevTools } from 'redux-devtools-extension';
// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


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

/* eslint-disable no-underscore-dangle */
const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)
));
/* eslint-enable */

export default store;