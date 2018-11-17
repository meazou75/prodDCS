import React from 'react';

import { NavLink } from 'react-router-dom';

import { Col, Row } from 'react-bootstrap';

import { fetchApi } from '../../Service/NetworkService';

import '../../Assets/css/profil.css';

class Profil extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            firstName: '',
            lastName: '',
            email: '',
            position: '',
            company: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        fetchApi('auth/me')
            .then(res => {
                this.setState({
                    firstName: res.user.firstName,
                    lastName: res.user.lastName,
                    email: res.user.email,
                    position: res.user.position,
                    company: res.user.role === 0 ? res.user.company : null,
                    loading: false
                });
            })
            .catch(err => console.log(err));
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <Row className="profil-container">
                <Col md={2} className="sidebar">
                    <h3>My Profile</h3>
                    <NavLink to="/profile/report" activeClassName="active">
                        <button>Report List</button>
                    </NavLink>
                    <NavLink to="/profile" activeClassName="active">
                        <button>Personal Information</button>
                    </NavLink>
                    <NavLink to="/profile/security" activeClassName="active">
                        <button>Security</button>
                    </NavLink>
                </Col>
                <Col md={10} className="content">
                    <div className="profile-container-content">
                        <h1 className="profile-container-header">
                            Personal Information
                        </h1>
                        <div className="profile-container-name">
                            <i className="fas fa-user-circle user_icon" />
                            <label className="profile-input-label">Name</label>
                            <input
                                type="text"
                                className="profile-name-input"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={this.handleChange}
                            />
                            <i className="fas fa-user-circle user_icon" />
                            <label className="profile-input-label">
                                Surname
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                className="profile-surname-input"
                                value={this.state.lastName}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="profile-container-name">
                            <i class="fas fa-at user_icon" />
                            <label className="profile-input-label">
                                E-mail
                            </label>
                            <input
                                className="profile-name-input email"
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="profile-container-name">
                            <i class="fas fa-graduation-cap user_icon" />
                            <label className="profile-input-label">Position</label>
                            <input
                                disabled
                                className="profile-name-input disabled"
                                type="text"
                                name="position"
                                value={this.state.position}
                                onChange={this.handleChange}
                            />
                            <i class="fas fa-building user_icon" />
                            <label className="profile-input-label">
                                Company
                            </label>
                            <input
                                disabled={this.state.company ? false : true}
                                className={
                                    this.state.company
                                        ? 'profile-surname-input'
                                        : 'profile-surname-input disabled'
                                }
                                type="text"
                                name="company"
                                value={this.state.company}
                                onChange={this.handleChange}
                            />
                        </div>

                        <button className="profile-password-button-profil">
                            Submit
                        </button>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Profil;
