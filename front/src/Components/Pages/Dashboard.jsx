import React, { Component } from 'react';
import '../../Assets/css/accueil.css';
import '../../Assets/css/dashboard.css';

import { Row, Col } from 'react-bootstrap';

class Accueil extends Component {
    render() {
        return (
            <div className="dashboard-container">
                <Row className="dashboard-row">
                    <Col md={6} xs={12}>
                        <a href="/engineer_list">
                            <button className="dashboard-item">
                                <div className="dashboard-icon">
                                    <i className="fas fa-user-cog" />
                                </div>{' '}
                                Users List
                            </button>
                        </a>
                    </Col>
                    <Col md={6} xs={12}>
                        <a href="/dashboard/report_list">
                            <button className="dashboard-item">
                                <div className="dashboard-icon">
                                    <i className="fas fa-clipboard-list" />
                                </div>
                                Reports List
                            </button>
                        </a>
                    </Col>
                </Row>
                <Row className="dashboard-row">
                    <Col md={6} xs={12}>
                        <a href="/task">
                            <button className="dashboard-item">
                                <div className="dashboard-icon">
                                    <i className="fas fa-tasks" />
                                </div>
                                Tasks List{' '}
                            </button>
                        </a>
                    </Col>
                    <Col md={6} xs={12}>
                        <a href="/product">
                            <button className="dashboard-item">
                                <div className="dashboard-icon">
                                    <i className="fas fa-laptop" />
                                </div>
                                Products
                            </button>
                        </a>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Accueil;
