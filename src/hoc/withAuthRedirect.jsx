import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if(this.props.isAuth === false) return <Redirect to="/login"/>
            return <Component {...this.props} />
        }
    }

    let mapStateToProps = (state) => {
        return {
            isAuth: state.auth.isAuth
        }
    }

    let RedirectComponentWithState = connect(mapStateToProps, {})(RedirectComponent);

    return RedirectComponentWithState;
}

