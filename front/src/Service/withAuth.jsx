import React, { Component } from 'react';
import AuthService from './AuthService';

function withAuth(AuthComponent, role) {
    const Auth = new AuthService();

    return class AuthWrapped extends Component {
        constructor(props) {
            super();
            this.state = {
                status: false
            };
        }

        componentWillMount() {
           /* if (role === 0) {
                if (!Auth.isLoggedIn() || Auth.getRole() !== role) {
                    return this.props.history.replace('/login');
                }

                this.setState({ status: true });
            }

            if (role === 1) {
                if (!Auth.isLoggedIn() || Auth.getRole() !== role) {
                    return this.props.history.replace('/pro/login');
                }

                this.setState({ status: true });
            }*/

            if (!Auth.loggedIn()) {
                return this.props.history.replace('/auth/login');
            }

            this.setState({ status: true });
        }

        render() {
            if (this.state.status) {
                return <AuthComponent history={this.props.history} />;
            } else {
                return null;
            }
        }
    };
}

export default withAuth;