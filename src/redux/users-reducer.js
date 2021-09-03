
let initialState = {
    usersList: [
        { id: 0, followed: true, name: 'Dmitry K.', loc: 'Minsk, Belarus', status: 'Im looking for someone...' },
        { id: 0, followed: true, name: 'Dmitry K.', loc: 'Minsk, Belarus', status: 'Im looking for someone...' },
        { id: 0, followed: true, name: 'Dmitry K.', loc: 'Minsk, Belarus', status: 'Im looking for someone...' }
    ]
}

const usersReducer = (state = initialState, action, userId) => {
    switch (action.type) {
        case FOLLOW: 
            let is_followed = true;
            if (usersList[userId].followed) {
                is_followed = false;
            }
            return {
                ...state,
                usersList[userId].followed: is_followed
            }
        
        default:
            return state;
    }
}

const FOLLOW = 'FOLLOW';
export const unfollowAC = (id) => ({ type: FOLLOW, userId: id });

export default usersReducer;