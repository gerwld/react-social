import React from 'react';

let initialState = {
    users: [
        // { id: 0, followed: true, name: 'Andrew K.', loc: 'Minsk, Belarus', status: 'Im looking for someone...', avaHash: 'm1' },
        // { id: 1, followed: true, name: 'Anton B.', loc: 'Ukraine, Kiev', status: 'O, hi Mark', avaHash: '2' },
        // { id: 2, followed: true, name: 'Richard M.', loc: 'Poland, Warsaw', status: 'Uqwemubwem Osas', avaHash: 'm6' }
    ],
    totalUsers: 3,
    pageSize: 6,
    currentPage: 1,
    isFetching: true,
    isFollowing: []
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
                users: [...action.users]
            }
        case TOTAL_COUNT:
            return {
                ...state,
                totalUsers: (action.totalCount - 14000)
            }
        case SET_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case FOLLOWING_IN_PROGRESS: 
            return {
                ...state,
                isFollowing: action.isFetching 
                    ? [...state.isFollowing, action.userId] 
                    : state.isFollowing.filter(id => id != action.userId)
            }

        default:
            return state;
    }
}

// Action creators and constant's

const FOLLOW = 'FOLLOW';
const SET_USERS = 'SET_USERS';
const TOTAL_COUNT = 'TOTAL_COUNT';
const SET_PAGE = 'SET_PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS';

export const unfollowUser = (id) => ({ type: FOLLOW, userId: id });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const countOfUsers = (totalCount) => ({ type: TOTAL_COUNT, totalCount });
export const setPage = (page) => ({ type: SET_PAGE, page });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleIsFollowing = (isFetching, userId) => ({ type: FOLLOWING_IN_PROGRESS, isFetching, userId });


export default usersReducer;