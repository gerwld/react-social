const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';

// way to  state._state.profilePage

const profileReducer = (state, action) => {
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