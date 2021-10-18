import { reset } from "redux-form";

const ADD_COMMENT = 'comments-reducer/ADD_COMMENT';
const DELETE_COMMENT = 'comments-reducer/ADD_COMMENT';
const EDIT_COMMENT = 'comments-reducer/ADD_COMMENT';

export const addComment = (commentData) => ({ type: ADD_COMMENT, commentData });
export const deleteComment = (commentId) => ({ type: DELETE_COMMENT, commentId });
export const editComment = (commentId, newText) => ({ type: EDIT_COMMENT, commentId, newText });

let initialState = {
    list: [
        { id: '', postId: "2021-10-18T16:18:45ZThe_postId", senderId: 123, avatar: '/images/avatars/def-avatar.png', fullName: 'Salvadore Dali', text: 'Just a comment', data: "2021-10-18T14:00:01Z", likes: 5 },
        { id: '', postId: '2007-10-17T13:06:15Z', senderId: 123, avatar: '/images/avatars/def-avatar.png', fullName: 'Edward Gutmann', text: 'Wow, cool dog. Is it yours? 😎', data: "2015-10-18T14:00:01Z", likes: 5 },
        { id: '', postId: '2007-10-17T13:06:15Z', senderId: 19461, avatar: "https://social-network.samuraijs.com/activecontent/images/users/19461/user-small.jpg?v=7", fullName: "P Jaworski", text: "Edward, yep. Thanks", data: "2015-10-18T20:49:39+02:00", likes: 1 },
    ]
}

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT:
            return {
                ...state,
                list: [...state.list, action.commentData]
            }
        case DELETE_COMMENT:
            return {
                ...state,
                list: state.list.filter(comment => comment.id !== action.commentId)
            }
        case EDIT_COMMENT:
            let newComment = state.list.map(c => c.id === action.commentId);
            newComment.text = action.newText;
            let newState = {
                ...state,
                list: [...state.list, newComment]
            }
            return newState;
        default:
            return state;
    }
}

export const addCommentTC = (comment) => {
    debugger;
    return (dispatch) => {
        if (comment.postId && comment.senderId && comment.id && comment.text) {
            dispatch(addComment(comment));
            dispatch(reset(comment.postId + '_form'));
        }
    }
}


export default commentsReducer;