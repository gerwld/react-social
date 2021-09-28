import React from 'react'
import { entertaimentAPI } from '../api/api';
import moment from 'moment';

const SEND_MESSAGE = 'SEND-MESSAGE';
const LOAD_POSTS = 'LOAD_POSTS';
const LAST_POST_DATE = 'LAST_POST_DATE';

//Action Creators
export const onSend = (message, userID, userdata, avatar) => ({ type: SEND_MESSAGE, message, userID, userdata, avatar });
export const loadPosts = (posts) => ({ type: LOAD_POSTS, posts });
export const addLastPostDate = (date) => ({ type: LAST_POST_DATE, date });

let initialState = {
    posts: [],
    nextPage: 1,
    pageSize: 5,
    lastPostDate: ""
}

const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            return state;
        }
        case LOAD_POSTS: {
            return {
                ...state,
                nextPage: state.nextPage + 1,
                posts: [...state.posts, ...action.posts]
            }
        }
        case LAST_POST_DATE:
            return {
                ...state,
                lastPostDate: action.date
            }

        default:
            return state;
    }
}

export const loadPostsTC = () => {
    return (dispatch, getState) => {
        entertaimentAPI.getPosts(getState().feed.nextPage).then(r => {
            dispatch(loadPosts(r));
            let date = moment(r[r.length - 1].publishedAt, "YYYY-MM-DD-h:mm").fromNow().replace(" ago", "");
            dispatch(addLastPostDate(date));
        });
    }
}



export default feedReducer;