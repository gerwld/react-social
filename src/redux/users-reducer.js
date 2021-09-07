import React from 'react';

let initialState = {
    users: [
        { id: 0, followed: true, name: 'Andrew K.', loc: 'Minsk, Belarus', status: 'Im looking for someone...', avaHash: 'm1' },
        { id: 1, followed: true, name: 'Anton B.', loc: 'Ukraine, Kiev', status: 'O, hi Mark', avaHash: '2' },
        { id: 2, followed: true, name: 'Richard M.', loc: 'Poland, Warsaw', status: 'Uqwemubwem Osas', avaHash: 'm6' }
    ],
    totalUsers: 3
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId && u.followed === true) {
                        return { ...u, followed: false };
                    } else if (u.id === action.userId && u.followed === false) {
                        return { ...u, followed: true };
                    }
                    return u;
                })
            }
             
        case SET_USERS: 
            return {
                ...state,
                users: [...state.users, ...action.users] 
            }
        case TOTAL_COUNT: 
            return {
                ...state,
                totalUsers: (3 + action.totalCount - 14000)
            }

        default:
            return state;
    }
}

const FOLLOW = 'FOLLOW';
const SET_USERS = 'SET_USERS';
const TOTAL_COUNT = 'TOTAL_COUNT';

export const unfollowAC = (id) => ({ type: FOLLOW, userId: id });
export const setUsersAC = (users) => ({ type: SET_USERS, users });
export const totalCountAC = (totalCount) => ({type: TOTAL_COUNT, totalCount});


export default usersReducer;