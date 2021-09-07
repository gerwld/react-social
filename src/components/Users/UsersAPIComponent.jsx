import React from "react";
import * as axios from 'axios';
import Users from "./Users";

class UsersAPIComponent extends React.Component {

   componentDidMount() {
        if (this.props.users.length < 4) {
            this.getUsers();
        }
    }

    onPageChanged = (pageNumber) => {
        this.props.setPage(pageNumber);
         axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`).then(response => {
            this.props.setUsers(response.data.items);
    });
    }

    getUsers = () => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`).then(response => {
            this.props.setUsers(response.data.items);
            this.props.countOfUsers(response.data.totalCount);
        });
    }

    render() {

        return (
           <Users totalUsers={this.props.totalUsers} 
                    pageSize={this.props.pageSize} 
                    currentPage={this.props.currentPage} 
                    onPageChanged={this.onPageChanged} 
                    users={this.props.users}
                    unfollowUser={this.props.unfollowUser}/>
        )
    }
}

export default UsersAPIComponent;