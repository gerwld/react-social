import { combineReducers, createStore } from "redux";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./navbar-reducer";
import profileReducer from './profile-reducer';
import usersReducer from "./users-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messagePage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer
});

const store = createStore(reducers);

export default store;