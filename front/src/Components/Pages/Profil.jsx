import React from 'react';

import { NavLink } from 'react-router-dom';

import { Col, Row } from 'react-bootstrap';

import '../../Assets/css/profil.css';

class Profil extends React.Component {
    render() {
        return (
            <Row className="profil-container">
                <Col md={2} className="sidebar">
                    <h3>My Profil</h3>
                    <NavLink to="#" activeClassName="active">
                        <button>Personal Informations</button>
                    </NavLink>
                    <NavLink to="#" activeClassName="active">
                        <button>Security</button>
                    </NavLink>
                    <NavLink to="#" activeClassName="active">
                        <button>Profil Picture</button>
                    </NavLink>
                </Col>
                <Col md={10} className="content">
                    <p>Content</p>
                </Col>
            </Row>
        );
    }
}

export default Profil;
