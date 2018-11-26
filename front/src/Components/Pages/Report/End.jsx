import React from 'react';
import { endpoint } from '../../../Constants';

class End extends React.Component {
    render() {
        return (
            <div className="report-container">
                <h2>Report Id: #{this.props.reportId} successfully created !</h2>
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
                    <img alt="Finished" src="/img/graphic-confirmation-2.svg" />
                    <h2>Your Report has been successfully created ! </h2>
                    <p>
                        To come back at the home page, please click on the
                        bottom belowe.
                    </p>
                    <a href={`${endpoint}/report/download/${this.props.reportId}`}>
                        <button
                            style={{marginRight: '10px'}}
                            type="button"
                            className="btn btn-primary btn-lg"
                        >
                            Download the report
                        </button>
                    </a>
                    <a href="/profile/report">
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

export default End;
