import React from 'react';

import '../../Assets/css/customer.css';

import { Col, Row } from 'react-bootstrap';

import { NavLink } from 'react-router-dom';


function pendingReport(props) {
    return (
        <button className="pending-report">
            {' '}
            <i className="fas fa-file-alt" />
            {props}
            <i class="icon_cross fas fa-times icon" />
            <i class="icon_check fas fa-check icon" />
        </button>
    );
}

function approvedReport(props) {
    return (
        <button className="approved-report">
            {' '}
            <i className="fas fa-file-alt" />
            {props}
            <i class="icon fas fa-print" />
            <i class="icon far fa-envelope" />
        </button>
    );
}

function rejectedReport(props) {
    return (
        <button className="rejected-report">
            {' '}
            <i className="fas fa-file-alt" />
            {props}
            <i class="icon far fa-edit" />
            <i class="icon far fa-times-circle" />
        </button>
    );
}

class Customer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            modalState: false,
            modal2State: false,
            loading: true,
            selTask: 0
        };
    }

    render() {
        return (
            <Row className="profil-container">
                <Col md={2} className="sidebar">
                    <h3>My Profil</h3>
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
                    <div className="main-container">
                        <div className="container-customer pending-container">
                            <div className="pending-container-header">
                                Waiting Reports
                            </div>
                            {pendingReport(
                                'Report - 19/09/2018 - François DELVILLE'
                            )}
                            {pendingReport(
                                'Report - 22/09/2018 - François DELVILLE'
                            )}
                        </div>
                        <div className="container-customer user-container">
                            <div className="processed-container-header">
                                Processed Reports
                            </div>
                            {approvedReport(
                                'Report - 22/09/2018 - François DELVILLE - Status : Approved'
                            )}
                            {rejectedReport(
                                'Report - 19/09/2018 - François DELVILLE - Status : Rejected'
                            )}
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Customer;
