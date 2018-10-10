import React from 'react';
import { Route } from 'react-router-dom';

import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';

class AuthLayout extends React.Component {
    render() {
        return (
            <div>
                <div className="auth-header">
                    <img
                        src="https://via.placeholder.com/170x70"
                        alt="logo-dcs"
                        className="logo-DCS"
                    />
                </div>
                <div className="login-page">
                    <Route exact path="/auth/login" component={Login} />
                    <Route exact path="/auth/register" component={Register} />
                </div>
            </div>
        );
    }
}

export default AuthLayout;
