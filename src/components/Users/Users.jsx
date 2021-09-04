import React from 'react';
import s from './Users.module.css';

const Users = (props) => {
   
    return (
        <div>
            <div className={s.block}>Users will be here</div>
            <button onClick={() => props.unfollowUser(1)}> fb</button>
        </div>
    )
}

export default Users;