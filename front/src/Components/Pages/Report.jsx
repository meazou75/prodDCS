import React from 'react';

import '../../Assets/css/report.css';

class Report extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            state: 0
        };
    }

    render() {
        const footerBar = () => {
            return (
                <div>
                    <hr />
                    <div className="report-footer">
                        <button
                            style={{ float: 'left' }}
                            onClick={() => {
                                if (this.state.state > 0) {
                                    this.setState({
                                        state: this.state.state - 1
                                    });
                                }
                            }}
                            className="btn btn-danger"
                        >
                            Back
                        </button>
                        <button
                            style={{ float: 'right' }}
                            className="btn btn-success"
                            onClick={() => {
                                this.setState({
                                    state: this.state.state + 1
                                });
                            }}
                        >
                            {this.state.state === 2 ? 'Validate' : 'Next'}
                        </button>
                    </div>
                </div>
            );
        };

        if (this.state.state === 0) {
            return (
                <div className="report-container">
                    <h2>Client Informations</h2>
                    <div className="progress">
                        <div
                            className="progress-bar progress-bar-success"
                            role="progressbar"
                            style={{ width: '0%' }}
                        >
                            <span className="sr-only">0% Complete</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <p>
                            Select the client{' '}
                            <span className="required-text">(*)</span> :
                        </p>
                        <select className="form-control">
                            <option>Company 1</option>
                            <option>Company 2</option>
                            <option>Company 3</option>
                            <option>Company 4</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <p>
                            Client Location{' '}
                            <span className="required-text">(*)</span> :
                        </p>
                        <div className="form-group">
                            <input className="form-control" type="text" />
                        </div>
                    </div>
                    {footerBar()}
                </div>
            );
        }
        if (this.state.state === 1) {
            return (
                <div className="report-container">
                    <h2>Time Informations</h2>
                    <div className="progress">
                        <div
                            className="progress-bar progress-bar-success"
                            role="progressbar"
                            style={{ width: '35%' }}
                        >
                            <span className="sr-only">35% Complete</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <p>Time IN : </p>
                        <input
                            style={{ textAlign: 'center' }}
                            className="form-control"
                            type="time"
                        />
                    </div>

                    <div className="form-group">
                        <p>Time OUT : </p>
                        <input
                            style={{ textAlign: 'center' }}
                            className="form-control"
                            type="time"
                        />
                    </div>
                    <div className="form-group">
                        <p>Ignore Lunch BreakTime : </p>
                        <div className="toggle-radio">
                            <input type="radio" name="rdo" id="yes" checked />
                            <input type="radio" name="rdo" id="no" />
                            <div className="switch">
                                <label htmlFor="yes">Yes</label>
                                <label htmlFor="no">No</label>
                                <span />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <p>Ignore Dinner BreakTime : </p>
                        <div className="toggle-radio">
                            <input type="radio" name="rdo2" id="yes1" checked />
                            <input type="radio" name="rdo2" id="no1" />
                            <div className="switch">
                                <label htmlFor="yes1">Yes</label>
                                <label htmlFor="no1">No</label>
                                <span />
                            </div>
                        </div>
                    </div>
                    {footerBar()}
                </div>
            );
        }
        if (this.state.state === 2) {
            return (
                <div className="report-container">
                    <h2>Tasks Informations</h2>
                    <div className="progress">
                        <div
                            className="progress-bar progress-bar-success"
                            role="progressbar"
                            style={{ width: '60%' }}
                        >
                            <span className="sr-only">60% Complete</span>
                        </div>
                    </div>

                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title">Task n°1</h3>
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <p>
                                    Task Type{' '}
                                    <span className="required-text">(*)</span> :
                                </p>
                                <select className="form-control">
                                    <option>Task 1</option>
                                    <option>Task 2</option>
                                    <option>Task 3</option>
                                    <option>Task 4</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <p>
                                    Product Brand{' '}
                                    <span className="required-text">(*)</span> :
                                </p>
                                <select className="form-control">
                                    <option>Product 1</option>
                                    <option>Product 2</option>
                                    <option>Product 3</option>
                                    <option>Product 4</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <p>
                                    Product Model{' '}
                                    <span className="required-text">(*)</span> :
                                </p>
                                <select className="form-control">
                                    <option>Model 1</option>
                                    <option>Model 2</option>
                                    <option>Model 3</option>
                                    <option>Model 4</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <p>
                                    Device Quantity{' '}
                                    <span className="required-text">(*)</span> :{' '}
                                </p>
                                <input className="form-control" type="number" />
                            </div>
                            <div className="form-group">
                                <p>
                                    Task Detail{' '}
                                    <span className="required-text">(*)</span> :
                                </p>
                                <textarea className="form-control" rows="3" />
                            </div>
                            <div className="form-group">
                                <p>
                                    Status{' '}
                                    <span className="required-text">(*)</span> :
                                </p>
                                <select className="form-control">
                                    <option>Done</option>
                                    <option>Pending</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: '36px' }}>
                        <button
                            style={{ float: 'right' }}
                            type="button"
                            className="btn btn-primary"
                        >
                            Add Task
                        </button>
                    </div>
                    {footerBar()}
                </div>
            );
        }
        if (this.state.state === 3) {
            return (
                <div className="report-container">
                    <h2>Task Id: #22222 successfully created !</h2>
                    <div className="progress">
                        <div
                            className="progress-bar progress-bar-success"
                            role="progressbar"
                            style={{ width: '100%' }}
                        >
                            <span className="sr-only">100% Complete</span>
                        </div>
                    </div>
                    <div className="successfully-report">
                        <img
                            alt="Finished"
                            src="/img/graphic-confirmation-2.svg"
                        />
                        <h2>Your Report has been successfully created ! </h2>
                        <p>
                            To come back at the home page, please click on the
                            bottom belowe.
                        </p>
                        <a href="/dashboard">
                            <button
                                type="button"
                                className="btn btn-primary btn-lg"
                            >
                                Dashboard
                            </button>
                        </a>
                    </div>
                </div>
            );
        }
    }
}

export default Report;
