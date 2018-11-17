import React from 'react';

import { NavLink } from 'react-router-dom';

import { Col, Row } from 'react-bootstrap';

import { endpoint } from '../../Constants';

import '../../Assets/css/profil.css';

class ProfilSecurity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: []
        };
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
                            Confidential Information
                        </h1>
                        <form>
                            <div className="profile-container-name">
                                <i class="fas fa-lock user_icon" />
                                <label className="profile-input-label-password">
                                    Current Password
                                </label>
                                <input className="profile-name-input-security" />
                            </div>

                            <div className="profile-container-name">
                                <i class="fas fa-key user_icon" />
                                <label className="profile-input-label-password">
                                    New Password
                                </label>
                                <input className="profile-name-input-security" />
                                <i class="fas fa-key user_icon" />
                                <label className="profile-input-label-password">
                                    Confirm New Password
                                </label>
                                <input className="profile-name-input-security" />
                            </div>
                            <button className='profile-password-button'>Submit</button>
                        </form>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default ProfilSecurity;
