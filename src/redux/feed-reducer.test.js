import React from 'react'
import feedReducer, { loadPosts } from './feed-reducer';

let state = {
    posts: [
        {id: 1, m:'Post', data:'20150505T0403'},
        {id: 2, m:'Post', data:'20150505T0403'},
        {id: 3, m:'Post', data:'20150505T0403'},
    ]
}

it('new posts should be added, and next page be incremented', () => {
    //1. test data
    let action = loadPosts([{id: 12377, m:'Post test', data:'20210505T0409'}, {id: 12377, m:'Post test 2', data:'20210505T0409'}]);
   
    //2. action
    let newState = feedReducer(state, action);

    //3. expectation
    expect (newState.posts.length).toBe(5);
});

it('last new post message should be correct', () => {
    let action = loadPosts([{id: 12377, m:'Post test', data:'20210505T0409'}, {id: 12377, m:'Post test 2', data:'20210505T0409'}]);

    let newState = feedReducer(state, action);
    expect (newState.posts[4].m).toBe('Post test 2');
});