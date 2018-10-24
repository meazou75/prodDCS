import React from 'react';

import { connect } from 'react-redux';

import { addNotification } from '../../../Redux/Actions';

import '../../../Assets/css/report.css';

import ClientInformations from './ClientInformations';
import TaskInformations from './TaskInformations';
import TimesInformations from './TimesInformations';
import End from './End';

import { fetchApi } from '../../../Service/NetworkService';

class Report extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            state: 0,
            companies: [],
            products: [],
            tasks: [],
            companyId: null,
            companyLocation: '',
            timeIn: new Date(),
            timeOut: new Date(),
            ignoreLunch: false,
            ignoreDiner: false,
            ignoreLunchTime: '00:00',
            ignoreDinerTime: '00:00',
            totalTime: 0
        };
    }

    componentWillMount() {
        fetchApi('user/company')
            .then(res => {
                this.setState({ companies: res.companies });
                if (res.companies.length > 0) {
                    this.setState({ companyId: res.companies[0]._id });
                }
            })
            .catch(err => console.log(err));

        fetchApi('product')
            .then(res => {
                this.setState({ products: res.products });
            })
            .catch(err => console.log(err));

        fetchApi('task')
            .then(res => {
                this.setState({ tasks: res.tasks });
            })
            .catch(err => console.log(err));

        this.setState({ loading: false });
    }

    validateState = status => {
        if (status === 0) {
            if (this.state.companyLocation === '') {
                this.props.addNotification({
                    title: 'Please specify the location',
                    color: '#ff4858'
                });
                return false;
            }
            return true;
        }
        if (status === 1) {
            let timeDiff, dinerTime, lunchTime, totalTime;

            timeDiff = Math.abs(
                this.state.timeOut.getTime() - this.state.timeIn.getTime()
            );

            if (this.state.ignoreDiner) {
                dinerTime =
                    parseInt(this.state.ignoreDinerTime.split(':')[0], 10) *
                        60 *
                        60 *
                        1000 +
                    parseInt(this.state.ignoreDinerTime.split(':')[1], 10) *
                        60 *
                        1000;
            } else {
                dinerTime = 0;
            }

            if (this.state.ignoreLunch) {
                lunchTime =
                    parseInt(this.state.ignoreLunchTime.split(':')[0], 10) *
                        60 *
                        60 *
                        1000 +
                    parseInt(this.state.ignoreLunchTime.split(':')[1], 10) *
                        60 *
                        1000;
            } else {
                lunchTime = 0;
            }

            totalTime = timeDiff - dinerTime - lunchTime;

            if (totalTime <= 0) {
                this.props.addNotification({
                    title: 'Total Time is under 0',
                    color: '#ff4858'
                });
                return false;
            }

            this.setState({ totalTime: totalTime });
            return true;
        }
        if(status === 2) {
            return true;
        }
    };

    render() {
        if (this.state.loading) {
            return <p>Loading...</p>;
        }

        if (this.state.state === 0) {
            return (
                <ClientInformations
                    {...this.state}
                    validateState={this.validateState}
                    nextStep={() =>
                        this.setState({ state: this.state.state + 1 })
                    }
                    prevStep={() =>
                        this.setState({ state: this.state.state - 1 })
                    }
                    handleChange={e => {
                        this.setState({
                            [e.target.name]: e.target.value
                        });
                    }}
                />
            );
        }
        if (this.state.state === 1) {
            return (
                <TimesInformations
                    {...this.state}
                    validateState={this.validateState}
                    nextStep={() =>
                        this.setState({ state: this.state.state + 1 })
                    }
                    prevStep={() =>
                        this.setState({ state: this.state.state - 1 })
                    }
                    handleChange={e => {
                        this.setState({
                            [e.target.name]: e.target.value
                        });
                    }}
                />
            );
        }
        if (this.state.state === 2) {
            return (
                <TaskInformations
                    {...this.state}
                    validateState={this.validateState}
                    nextStep={() =>
                        this.setState({ state: this.state.state + 1 })
                    }
                    prevStep={() =>
                        this.setState({ state: this.state.state - 1 })
                    }
                    handleChange={e => {
                        this.setState({
                            [e.target.name]: e.target.value
                        });
                    }}
                />
            );
        }
        if (this.state.state === 3) {
            return (
                <End
                    {...this.state}
                    validateState={this.validateState}
                    nextStep={() =>
                        this.setState({ state: this.state.state + 1 })
                    }
                    prevStep={() =>
                        this.setState({ state: this.state.state - 1 })
                    }
                    handleChange={e => {
                        this.setState({
                            [e.target.name]: e.target.value
                        });
                    }}
                />
            );
        }
    }
}

export default connect(
    null,
    { addNotification }
)(Report);
