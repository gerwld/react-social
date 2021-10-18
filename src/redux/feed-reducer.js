import { entertaimentAPI } from '../api/api';
import moment from 'moment';
import { reset } from 'redux-form';


const LOAD_POSTS = 'soc-net-pjaw/feed-reducer/LOAD_POSTS';
const ADD_POST = 'soc-net-pjaw/feed-reducer/ADD_POST';
const LAST_POST_DATE = 'soc-net-pjaw/feed-reducer/LAST_POST_DATE';
const DELETE_POST = 'soc-net-pjaw/feed-reducer/DELETE_POST';

export const loadPosts = (posts) => ({ type: LOAD_POSTS, posts });
export const addLastPostDate = (date) => ({ type: LAST_POST_DATE, date });
export const addNewPost = (postData) => ({ type: ADD_POST, postData });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });

let initialState = {
    posts: [],
    nextPage: 1,
    pageSize: 3,
    lastPostDate: ""
}

const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POSTS:
            return {
                ...state,
                nextPage: parseInt(state.nextPage, 10) + 1,
                posts: [...state.posts, ...action.posts]
            }
        case LAST_POST_DATE:
            return {
                ...state,
                lastPostDate: action.date
            }
        case ADD_POST:
            return {
                ...state,
                posts: [action.postData, ...state.posts]
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.source.postId !== action.postId)
            } 
        default:
            return state;
    }
}

export const loadPostsTC = (nextPage, pageSize) => {
    return async (dispatch) => {
        let res = await entertaimentAPI.getPosts(nextPage, pageSize);
        let posts = res.map(r => {
            return { 
            "source": {
            "postId": r.publishedAt + r.source.name.split(" ")[0] + '_postId',
            "name": r.source.name
          },
          "title": r.title,
          "url": r.url,
          "urlToImage": r.urlToImage,
          "publishedAt": r.publishedAt,
          "content": r.description + r.content
         }});
         
        dispatch(loadPosts(posts));
        let date = moment(res[res.length - 1].publishedAt, "YYYY-MM-DD-h:mm").fromNow().replace(" ago", "");
        dispatch(addLastPostDate(date));
    }
}

export const addNewPostTC = (postData) => {
    return (dispatch) => {
        dispatch(addNewPost(postData));
        dispatch(reset('whatsNewFeed'));
    }
}

export default feedReducer;