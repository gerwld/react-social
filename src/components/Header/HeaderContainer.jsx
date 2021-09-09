import axios from 'axios';
import React from 'react';
import Header from './Header';
import { setUserData } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { usersAPI } from '../../api/api';

class HeaderContainer extends React.Component {

    componentDidMount(){
        usersAPI.getAuth().then(r => {
            if(r.resultCode === 0) {
                this.props.setUserData(r.data.id, r.data.email, r.data.login);
            }
        })
    }

    render() {
        return (
            <Header {...this.props} />
        );
    }
}

let mapStateToProps = (state) => {
    return {
        state: state,
        data: state.auth,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {setUserData})(HeaderContainer);