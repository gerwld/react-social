import React from 'react'
import { entertaimentAPI } from '../api/api';

const SEND_MESSAGE = 'SEND-MESSAGE';
const LOAD_POSTS = 'LOAD_POSTS';

//Action Creators
export const onSend = (message, userID, userdata, avatar) => ({ type: SEND_MESSAGE, message, userID, userdata, avatar });
export const loadPosts = (posts) => ({ type: LOAD_POSTS, posts });

let initialState = {
    posts: null
}

const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            return state;
        }
        case LOAD_POSTS: {
            return {
                ...state,
                posts: action.posts
            }
        }

        default:
            return state;
    }
}

export const loadPostsTC = (serving = 5, currPage = 1) => {
    return (dispatch, getState) => {
        entertaimentAPI.getPosts(serving, currPage).then(r => {
            // debugger;
            dispatch(loadPosts(r));
            console.log(getState());
        });
    }
}



export default feedReducer;