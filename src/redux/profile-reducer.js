const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';


//Action Creators
export const updateTextActionCreator = (newText) => ({ type: UPDATE_NEW_POST_TEXT, newText: newText });
export const addPostActionCreator = () => ({ type: ADD_POST })

let initialState = {
    postData: [
        { id: 2, likes: 999 },
        { id: 1, cont: "Deez nuts... Today everything is fine, just vibing with my famity #coolday", likes: 28 },
        { id: 0, cont: "Hi there!! 2007 is rock!", likes: 23 }
    ],
    newPostText: ""
};

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST: 
            let allPosts = state.postData;
            let newPost = { id: allPosts.length++, cont: state.newPostText, likes: 0 };
            allPosts.push(newPost);
            state.newPostText = "";
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default: 
            return state;
    }
}

export default profileReducer;