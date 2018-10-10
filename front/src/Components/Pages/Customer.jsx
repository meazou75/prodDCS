import React from 'react';
import { Modal } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import '../../Assets/css/customer.css';

function submit(props) {
    confirmAlert({
        title: 'Delete Confirmation',
        message: 'Are you sure you want to delete it ?',
        buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    fetch(`http://159.89.205.75:3333/api/task/${props._id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.success === true) {
                                props.onDelete();
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
            <div className="main-container">
                <div className="container-customer pending-container">
                    <div className="pending-container-header">
                        Waiting Reports
                    </div>
                    {pendingReport('Report - 19/09/2018 - François DELVILLE')}
                    {pendingReport('Report - 22/09/2018 - François DELVILLE')}
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
        );
    }
}

export default Customer;
