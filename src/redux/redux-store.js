import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import appReducer from "./app-reducer";
import audioReducer from "./audio-reducer";
import authReducer from './auth-reducer';
import commentsReducer from "./comments-reducer";
import dialogsReducer from "./dialogs-reducer";
import feedReducer from "./feed-reducer";
import profileReducer from './profile-reducer';
import usersReducer from "./users-reducer";


let reducers = combineReducers({
    app: appReducer,
    profilePage: profileReducer,
    messagePage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    feed: feedReducer,
    audio: audioReducer,
    comments: commentsReducer,
    form: formReducer
});

/* eslint-disable no-underscore-dangle */
// const store = createStore(reducers,
//     applyMiddleware(thunk)
// );
/* eslint-enable */

/* eslint-disable no-underscore-dangle */
const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)
));
/* eslint-enable */

export default store;