import React from 'react'
import { entertaimentAPI } from '../api/api';

const SEND_MESSAGE = 'SEND-MESSAGE';
const LOAD_POSTS = 'LOAD_POSTS';

//Action Creators
export const onSend = (message, userID, userdata, avatar) => ({ type: SEND_MESSAGE, message, userID, userdata, avatar });
export const loadPosts = (posts) => ({ type: LOAD_POSTS, posts });

let initialState = {
    posts: [],
    nextPage: 1,
    pageSize: 5
}

const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            return state;
        }
        case LOAD_POSTS: {
            let haha = {
                ...state,
                nextPage: state.nextPage + 1,
                posts: [...state.posts, ...action.posts]
            }

            return haha;
            
        }

        default:
            return state;
    }
}

export const loadPostsTC = (pageSize = 5) => {
    return (dispatch, getState) => {
        entertaimentAPI.getPosts(pageSize, (getState().feed.nextPage)).then(r => {
            dispatch(loadPosts(r));
        });
    }
}



export default feedReducer;