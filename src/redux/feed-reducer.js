import React from 'react'
import { entertaimentAPI } from '../api/api';
import moment from 'moment';


const LOAD_POSTS = 'soc-net-pjaw/feed-reducer/LOAD_POSTS';
const LAST_POST_DATE = 'soc-net-pjaw/feed-reducer/LAST_POST_DATE';

//Action Creators
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
        case LOAD_POSTS: {
            
            let aa = {
                ...state,
                nextPage: parseInt(state.nextPage, 10) + 1,
                posts: [...state.posts, ...action.posts]
            }
            // debugger;
            return aa;
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

export const loadPostsTC = (nextPage, pageSize) => {
    return async (dispatch) => {
        let r = await entertaimentAPI.getPosts(nextPage, pageSize);
            dispatch(loadPosts(r));
            let date = moment(r[r.length - 1].publishedAt, "YYYY-MM-DD-h:mm").fromNow().replace(" ago", "");
            dispatch(addLastPostDate(date));
    }
}



export default feedReducer;