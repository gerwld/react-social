import React from 'react';
import { usersAPI } from '../api/api';

const FOLLOW = 'soc-net-pjaw/users-reducer/FOLLOW';
const SET_USERS = 'soc-net-pjaw/users-reducer/SET_USERS';
const TOTAL_COUNT = 'soc-net-pjaw/users-reducer/TOTAL_COUNT';
const SET_PAGE = 'soc-net-pjaw/users-reducer/SET_PAGE';
const TOGGLE_IS_FETCHING = 'soc-net-pjaw/users-reducer/TOGGLE_IS_FETCHING';
const FOLLOWING_IN_PROGRESS = 'soc-net-pjaw/users-reducer/FOLLOWING_IN_PROGRESS';
const GET_ALL_PAGES = 'soc-net-pjaw/users-reducer/GET_ALL_PAGES';
const LOAD_FRIENDS_TOGGLE = 'soc-net-pjaw/users-reducer/LOAD_FRIENDS_TOGGLE';
const DO_SEARCH = 'soc-net-pjaw/users-reducer/DO_SEARCH';

export const unfollowUser = (id) => ({ type: FOLLOW, userId: id });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const countOfUsers = (totalCount) => ({ type: TOTAL_COUNT, totalCount });
export const setPage = (page) => ({ type: SET_PAGE, page });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleIsFollowing = (isFetching, userId) => ({ type: FOLLOWING_IN_PROGRESS, isFetching, userId });
export const getAllPages = (pagesCount) => ({ type: GET_ALL_PAGES, pagesCount });
export const loadFriendsToggle = (boolean) => ({ type: LOAD_FRIENDS_TOGGLE, boolean });
export const findUsers = (searchQuery) => ({ type: DO_SEARCH, searchQuery });

let initialState = {
    users: [
        // { id: 0, followed: true, name: 'Andrew K.', loc: 'Minsk, Belarus', status: 'Im looking for someone...', avaHash: 'm1' }
    ],
    totalUsers: 3,
    isFetching: true,
    isFollowing: [],
    pageSize: 7,
    currentPage: 1,
    allPages: 1,
    pagLength: 5,
    loadOnlyFriends: true,
    searchQuery: ''
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
                totalUsers: (action.totalCount)
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
        case GET_ALL_PAGES:
            return {
                ...state,
                allPages: action.pagesCount
            }
        case LOAD_FRIENDS_TOGGLE:
            return {
                ...state,
                isFetching: true,
                loadOnlyFriends: (typeof action.boolean == "boolean") ? action.boolean
                    : !state.loadOnlyFriends,
                currentPage: 1
            }
        case DO_SEARCH:
            return {
                ...state,
                searchQuery: action.searchQuery
            }
        default:
            return state;
    }
}


// Thunk Creators 
export const getUsersThunkCreator = (currentPage, pageSize, usersCount, friends, search) => {
    return (dispatch) => {
        if (usersCount <= pageSize) {
            dispatch(toggleIsFetching(true));
            usersAPI.getUsers(pageSize, currentPage, friends, search).then(data => {
                dispatch(setUsers(data.items));
                dispatch(countOfUsers(data.totalCount));
                dispatch(getAllPages(Math.ceil(data.totalCount / pageSize)));
                dispatch(toggleIsFetching(false));
            });
        }
    }
}

export const onPageChangeThunkCreator = (pageNumber, allPages, pageSize, friends, search) => {
    return (dispatch) => {
        //prevent set page bigger or less that it is possible
        pageNumber = pageNumber || 1;
        pageNumber = (pageNumber >= allPages) ? allPages : pageNumber;

        dispatch(setPage(pageNumber));
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(pageSize, pageNumber, friends, search).then(data => {
            dispatch(setUsers(data.items));
            dispatch(toggleIsFetching(false));
        });
    }
}

export const followUserThunkCreator = (user) => {
    return (dispatch) => {
        dispatch(toggleIsFollowing(true, user.id));
        if (!user.followed) {
            usersAPI.followUserRequest(user.id).then(r => {
                if (r && r.resultCode === 0) {
                    dispatch(unfollowUser(user.id));
                }
                dispatch(toggleIsFollowing(false, user.id));
            })
        } else {
            usersAPI.unfollowUserRequest(user.id).then(r => {
                if (r && r.resultCode === 0) {
                    dispatch(unfollowUser(user.id));
                }
                // r.resultCode === 0 && dispatch(unfollowUser(user.id));
                dispatch(toggleIsFollowing(false, user.id));
            })
        }
    }
}

export const getPaginationCurrentIndexesTC = (curPage, allPages, pagLength) => {
    return () => {
        let pagination = [];
        let count = 1;
        let notSmallerThanPag = (curPage + 2) > pagLength ? (curPage + 2) : pagLength;

        if (curPage > 3) {
            count = curPage - 2;
        }
        if (curPage > allPages - 3) {
            count = curPage - 4;
        }
        for (count; count <= notSmallerThanPag && count <= allPages; count++) {
            if (count > 0) {
                pagination.push(count);
            }
        }
        return pagination;
    }
}

export default usersReducer;