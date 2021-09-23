import axios from 'axios';
import React from 'react';
import Header from './Header';
import { setUserData } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { authAPI, getAuthUserDataTC, logoutUserTC } from '../../api/api';

class HeaderContainer extends React.Component {

    componentDidMount(){
        this.props.getAuthUserDataTC();
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

export default connect(mapStateToProps, {setUserData, getAuthUserDataTC, logoutUserTC})(HeaderContainer);