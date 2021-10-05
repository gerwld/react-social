import profileReducer, { deletePost } from "./profile-reducer";

it('after deleting posts length should be decrement', () => {
    //1. test data
    let action = deletePost(2);
    let state = {
        postData: [
            { id: 0, cont: "That site is so cool!", likes: 9 },
            { id: 1, cont: "Deez nuts... Today everything is fine, just vibing with my famity #coolday", likes: 28 },
            { id: 2, cont: "Hi there!! 2007 is rock!", likes: 23 }
        ]
    }    
    //2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect (newState.postData.length).toBe(2);
});

it(`after deleting posts length should'nt be decrement if id is incorrect`, () => {
    //1. test data
    let action = deletePost(999999);
    let state = {
        postData: [
            { id: 0, cont: "That site is so cool!", likes: 9 },
            { id: 1, cont: "Deez nuts... Today everything is fine, just vibing with my famity #coolday", likes: 28 },
            { id: 2, cont: "Hi there!! 2007 is rock!", likes: 23 }
        ]
    }    
    //2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect (newState.postData.length).toBe(3);
});