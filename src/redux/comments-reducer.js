import { reset } from "redux-form";

const ADD_COMMENT = 'comments-reducer/ADD_COMMENT';
const DELETE_COMMENT = 'comments-reducer/ADD_COMMENT';
const EDIT_COMMENT = 'comments-reducer/ADD_COMMENT';

export const addComment = (commentData) => ({ type: ADD_COMMENT, commentData });
export const deleteComment = (commentId) => ({ type: DELETE_COMMENT, commentId });
export const editComment = (commentId, newText) => ({ type: EDIT_COMMENT, commentId, newText });

let initialState = {
    list: [
        { id: '', postId: "2021-10-18T16:18:45ZThe_postId", senderId: 123, avatar: '/images/avatars/def-avatar.png', fullName:'P Jaworski', text: '123123', data: "2021-10-18T14:00:01Z", likes: 5 }
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