import React from 'react'
import { createSelector } from 'reselect'

export const getUsers = (state) => {
    return state.usersPage.users;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getIsFollowing = (state) => {
    return state.usersPage.isFollowing;
}

export const getTotalUsers = (state) => {
    return state.usersPage.totalUsers;
}

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getPages = (state) => {
    return state.usersPage.allPages;
}

export const getPagLength = (state) => {
    return state.usersPage.pagLength;
}

//React 'reselect' selector, created to optimize re-render in SPA. Starts only when getPagLength part of state was changed
//If it's not - get old return from cache

export const getPagLengthWithCreateSelecor = createSelector([getPagLength], (length) => {
    // length.filter(() => true);
    return length + 2 - 2;
    // return length;
})