import React from 'react';
import Footer from './Footer';

class ClientInformations extends React.Component {

    render() {

        const renderOptions = () => {
            return this.props.companies.map(company => {
                return (
                    <option key={company._id} value={company._id}>
                        {company.company} | {company.lastName}
                    </option>
                );
            });
        };

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
                    <select
                        name="companyId"
                        value={this.props.companyId || this.props.companies[0]}
                        onChange={this.props.handleChange}
                        className="form-control"
                    >
                        <option value="" selected disabled> Select a company</option>
                        {renderOptions()}
                    </select>
                </div>
                <div className="form-group">
                    <p>
                        Client Location{' '}
                        <span className="required-text">(*)</span> :
                    </p>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            name="companyLocation"
                            value={this.props.companyLocation}
                            onChange={this.props.handleChange}
                        />
                    </div>
                </div>
                <Footer {...this.props} />
            </div>
        );
    }
}

export default ClientInformations;
