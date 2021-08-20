import { combineReducers, createStore } from "redux";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./navbar-reducer";
import profileReducer from './profile-reducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    messagePage: dialogsReducer,
    sidebar: sidebarReducer
});

const store = createStore(reducers);

export default store;