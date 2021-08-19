const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';

// way to  state._state.profilePage

const profileReducer = (state, action) => {
    if (action.type === 'ADD-POST') {
        let allPosts = state.postData;
        let newPost = { id: allPosts.length++, cont: state.newPostText, likes: 0 };
        allPosts.push(newPost);
        state.newPostText = "";
    }
    else if (action.type === 'UPDATE-NEW-POST-TEXT') {
        state.newPostText = action.newText;
    }
    return state;
}

export default profileReducer;