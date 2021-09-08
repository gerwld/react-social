import axios from 'axios';
import React from 'react';
import Header from './Header';
import { setUserData } from '../../redux/auth-reducer';
import { connect } from 'react-redux';

class HeaderContainer extends React.Component {

    componentDidMount(){
        axios.get('https://social-network.samuraijs.com/api/1.0//auth/me', {withCredentials: true}).then(r => {
            let data = r.data.data;
            if(r.data.resultCode === 0) {
                this.props.setUserData(data.id, data.email, data.login);
            }
            console.log(this.props);
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
        data: state.auth,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {setUserData})(HeaderContainer);