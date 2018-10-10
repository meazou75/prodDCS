import React from 'react';
import { connect } from 'react-redux';

import AuthService from '../../../Service/AuthService';
import { addNotification } from '../../../Redux/Actions';

import '../../../Assets/css/authLayout.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.AuthService = new AuthService();
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.AuthService.login(this.state)
            .then(res => {
                this.props.addNotification({
                    title: "You've successfully logged in",
                    color: '#28cdbf'
                });
                this.props.history.replace('/');
            })
            .catch(err =>
                this.props.addNotification({
                    title: "ERROR : " + err,
                    color: '#ff4858'
                })
            );
    }

    render() {
        return (
            <div className="auth-container">
                <form>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="email@email.com"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="************"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button onClick={this.handleSubmit}>Login</button>
                    <p className="message">
                        Not registered ?{' '}
                        <a href="/auth/register">Create an account</a>
                    </p>
                </form>
            </div>
        );
    }
}

export default connect(
    null,
    { addNotification }
)(Login);
