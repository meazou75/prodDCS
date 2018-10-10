import React from 'react';

import AuthService from '../../../../Service/AuthService';

class RegisterCustomer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordC: '',
            role: 0,
            company: '',
            position: ''
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

        this.AuthService.register(this.state)
            .then(res => {
                this.props.onSuccess();
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
            <div class="auth-container">
                <h1>Customer Registration : </h1>
                <hr />
                <form class="register-form">
                    <div className="row">
                        <div
                            style={{ padding: '0px', paddingRight: '6px' }}
                            className="col-md-6"
                        >
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    name="firstName"
                                    onChange={this.handleChange}
                                    value={this.state.firstName}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 nopad">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastName"
                                    onChange={this.handleChange}
                                    value={this.state.lastName}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="email@email.com"
                            name="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                    </div>
                    <div className="row">
                        <div
                            style={{ padding: '0px', paddingRight: '6px' }}
                            className="col-md-6"
                        >
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    name="company"
                                    onChange={this.handleChange}
                                    value={this.state.company}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 nopad">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Position"
                                    name="position"
                                    onChange={this.handleChange}
                                    value={this.state.position}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div
                            style={{ padding: '0px', paddingRight: '6px' }}
                            className="col-md-6"
                        >
                            <div className="form-group">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 nopad">
                            <div className="form-group">
                                <input
                                    type="password"
                                    placeholder="Repeat Password"
                                    name="passwordC"
                                    onChange={this.handleChange}
                                    value={this.state.passwordC}
                                />
                            </div>
                        </div>
                    </div>
                    <button onClick={this.handleSubmit}>Create</button>
                    <p class="message">
                        Already registered? <a href="/auth/login">Sign In</a>
                    </p>
                </form>
            </div>
        );
    }
}

export default RegisterCustomer;
