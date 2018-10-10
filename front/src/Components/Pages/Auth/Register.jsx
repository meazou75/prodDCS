/* Library Import */

import React from 'react';
import { connect } from 'react-redux';

/* Components Import */

import { addNotification } from '../../../Redux/Actions';

import RegisterEngineer from './Components/RegisterEngineer';
import RegisterCustomer from './Components/RegisterCustomer';
import RegisterHome from './Components/RegisterHome';
import RegisterSuccess from './Components/RegisterSuccess';

/* Css Import */

import '../../../Assets/css/authLayout.css';

/* Register */

class Register extends React.Component {
    /* Render Method */

    constructor(props) {
        super(props);

        this.state = {
            registrationState: 0
        };
    }

    render() {
        return (
            <div>
                {(() => {
                    if (this.state.registrationState === 0) {
                        return (
                            <RegisterHome
                                onClick={i =>
                                    this.setState({ registrationState: i })
                                }
                            />
                        );
                    }
                    if (this.state.registrationState === 1) {
                        return (
                            <RegisterCustomer
                                addNotification={this.props.addNotification}
                                onSuccess={() =>
                                    this.setState({ registrationState: 3 })
                                }
                            />
                        );
                    }
                    if (this.state.registrationState === 2) {
                        return (
                            <RegisterEngineer
                                addNotification={this.props.addNotification}
                                onSuccess={() =>
                                    this.setState({ registrationState: 3 })
                                }
                            />
                        );
                    }
                    if (this.state.registrationState === 3) {
                        return <RegisterSuccess />;
                    }
                })()}
            </div>
        );
    }
}

export default connect(null, {addNotification})(Register);
