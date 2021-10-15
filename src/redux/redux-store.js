import { combineReducers, createStore, applyMiddleware } from "redux";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from './profile-reducer';
import usersReducer from "./users-reducer";
import authReducer from './auth-reducer';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";
import feedReducer from "./feed-reducer";
// import { composeWithDevTools } from 'redux-devtools-extension';
import audioReducer from "./audio-reducer";


let reducers = combineReducers({
    app: appReducer,
    profilePage: profileReducer,
    messagePage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    feed: feedReducer,
    audio: audioReducer,
    form: formReducer
});

/* eslint-disable no-underscore-dangle */
const store = createStore(reducers,
    applyMiddleware(thunk)
);
/* eslint-enable */

/* eslint-disable no-underscore-dangle */
// const store = createStore(reducers, composeWithDevTools(
//     applyMiddleware(thunk)
// ));
/* eslint-enable */

export default store;