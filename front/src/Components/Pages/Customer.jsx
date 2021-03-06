import React from 'react';

import '../../Assets/css/customer.css';

import { Col, Row } from 'react-bootstrap';

import { NavLink } from 'react-router-dom';

import { endpoint } from '../../Constants';

import { confirmAlert } from 'react-confirm-alert'; // Import

import { fetchApi } from '../../Service/NetworkService';

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function submitReject(props, getData) {
    confirmAlert({
        title: 'Reject Confirmation',
        message: 'Are you sure you want to reject it ?',
        buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    fetchApi(`/report/status/${props._id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            status: 'Rejected'
                        })
                    })
                        .then(res => {
                            if (res.success === true) {
                                getData();
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        });
                }
            },
            {
                label: 'No'
            }
        ]
    });
}

function submitAccept(props, getData) {
    confirmAlert({
        title: 'Accept Confirmation',
        message: 'Are you sure you want to accept it ?',
        buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    fetchApi(`/report/status/${props._id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            status: 'Accepted'
                        })
                    })
                        .then(res => {
                            if (res.success === true) {
                                getData();
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        });
                }
            },
            {
                label: 'No'
            }
        ]
    });
}

function pendingReport(props, getData) {
    const stringtodisplay =
        props.timeIn.substring(0, 10) +
        ' - ' +
        props.engineer.firstName +
        ' ' +
        props.engineer.lastName +
        ' [DCS] ' +
        ' To ' +
        props.customer.firstName +
        ' ' +
        props.customer.lastName +
        ' [' +
        props.customer.company +
        ']';
    return (
        <div className="report-container-customer">
            <div className="pending-report">
                <i className="fas fa-file-alt" />
                {(() => {
                    if (stringtodisplay.length > 48) {
                        return (
                            <span>{stringtodisplay.substring(0, 48)}...</span>
                        );
                    }
                    return <span>{stringtodisplay}</span>;
                })()}

                <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => submitReject(props, getData)}
                >
                    <i class="icon_cross fas fa-times icon" />
                </a>
                <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => submitAccept(props, getData)}
                >
                    <i class="icon_check fas fa-check icon" />
                </a>
                <a href={`${endpoint}/report/download/${props._id}`} style={{ cursor: 'pointer' }}>
                    <i class="icon fas fa-download" />
                </a>
            </div>
        </div>
    );
}

function approvedReport(props, getData) {
    const stringtodisplay =
        props.timeIn.substring(0, 10) +
        ' - ' +
        props.engineer.firstName +
        ' ' +
        props.engineer.lastName +
        ' [DCS] ' +
        ' To ' +
        props.customer.firstName +
        ' ' +
        props.customer.lastName +
        ' [' +
        props.customer.company +
        ']';
    return (
        <div className="report-container-customer">
            <div className="approved-report">
                <i className="fas fa-file-alt" />
                {(() => {
                    if (stringtodisplay.length > 48) {
                        return (
                            <span>{stringtodisplay.substring(0, 48)}...</span>
                        );
                    }
                    return <span>{stringtodisplay}</span>;
                })()}

                <a href={`${endpoint}/report/download/${props._id}`} style={{ cursor: 'pointer' }}>
                    <i class="icon_download fas fa-download" />
                </a>
            </div>
        </div>
    );
}

function rejectedReport(props, getData) {
    const stringtodisplay =
        props.timeIn.substring(0, 10) +
        ' - ' +
        props.engineer.firstName +
        ' ' +
        props.engineer.lastName +
        ' [DCS] ' +
        ' To ' +
        props.customer.firstName +
        ' ' +
        props.customer.lastName +
        ' [' +
        props.customer.company +
        ']';
    return (
        <div className="report-container-customer">
            <div className="rejected-report">
                <i className="fas fa-file-alt" />
                {(() => {
                    if (stringtodisplay.length > 58) {
                        return (
                            <span>{stringtodisplay.substring(0, 58)}...</span>
                        );
                    }
                    return <span>{stringtodisplay}</span>;
                })()}

                <a style={{ cursor: 'pointer' }}>
                    <i class="icon far fa-edit" />
                </a>
                <a style={{ cursor: 'pointer' }}>
                    <i class="icon far fa-times-circle" />
                </a>
            </div>
        </div>
    );
}

class Customer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            reports: [],
            modalState: false,
            modal2State: false,
            loading: true,
            selTask: 0
        };
    }

    getData() {
        fetchApi(`/report/me`)
            .then(res => {
                if (res.success === true) {
                    this.setState({ reports: res.reports, loading: false });
                }
            });
    }

    componentWillMount() {
        this.getData();
    }

    render() {

        const renderPendingReports = () => {
            return this.state.reports.map((reports, index) => {
                if (this.state.reports[index].status === 'Pending') {
                    return (
                        <div key={index}>
                            {pendingReport(reports, () => this.getData())}
                        </div>
                    );
                }
            });
        };

        const renderAcceptedReports = () => {
            return this.state.reports.map((reports, index) => {
                if (this.state.reports[index].status === 'Accepted') {
                    return (
                        <div key={index}>
                            {approvedReport(reports, () => this.getData())}
                        </div>
                    );
                }
            });
        };

        const renderRejectedReports = () => {
            return this.state.reports.map((reports, index) => {
                if (this.state.reports[index].status === 'Rejected') {
                    return (
                        <div key={index}>
                            {rejectedReport(reports, () => this.getData())}
                        </div>
                    );
                }
            });
        };

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
                    <div className="main-container">
                        <div className="container-customer pending-container">
                            <div className="pending-container-header">
                                Waiting Reports
                            </div>
                            {renderPendingReports()}
                        </div>
                        <div className="container-customer user-container">
                            <div className="processed-container-header">
                                Processed Reports
                            </div>
                            {renderAcceptedReports()}
                            {renderRejectedReports()}
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default Customer;
