import React from 'react'

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