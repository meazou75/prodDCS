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

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            loading: true,
            currentState: 0,
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
            totalTime: 0,
            taskInput: [
                {
                    taskType: '',
                    productBrand: '',
                    productModel: '',
                    quantity: 0,
                    details: []
                }
            ],
            actualTask: 0,
            reportId: ''
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
        if (status === 2) {
            for (let index = 0; index < this.state.taskInput.length; index++) {
                const element = this.state.taskInput[index];
                if (element.taskType === '') {
                    this.props.addNotification({
                        title:
                            'Please specify the task type for task n°' +
                            index +
                            1,
                        color: '#ff4858'
                    });
                    return false;
                }
                if (element.productBrand === '') {
                    this.props.addNotification({
                        title:
                            'Please specify the product brand for task n°' +
                            index +
                            1,
                        color: '#ff4858'
                    });
                    return false;
                }
                if (element.productModel === '') {
                    this.props.addNotification({
                        title:
                            'Please specify the product model for task n°' +
                            index +
                            1,
                        color: '#ff4858'
                    });
                    return false;
                }
                if (element.quantity === '') {
                    this.props.addNotification({
                        title:
                            'Please specify the product quantity for task n°' +
                            index +
                            1,
                        color: '#ff4858'
                    });
                    return false;
                }
                for (
                    let index2 = 0;
                    index2 < element.details.length;
                    index2++
                ) {
                    const element2 = element.details[index2];
                    if (element2.taskName === '') {
                        this.props.addNotification({
                            title:
                                'Please specify the task Name task n°' +
                                index +
                                1,
                            color: '#ff4858'
                        });
                        return false;
                    }
                }
            }
            return true;
        }
    };

    handleSubmit() {
        const dinerTime =
            parseInt(this.state.ignoreDinerTime.split(':')[0], 10) *
                60 *
                60 *
                1000 +
            parseInt(this.state.ignoreDinerTime.split(':')[1], 10) * 60 * 1000;

        const lunchTime =
            parseInt(this.state.ignoreDinerTime.split(':')[0], 10) *
                60 *
                60 *
                1000 +
            parseInt(this.state.ignoreDinerTime.split(':')[1], 10) * 60 * 1000;

        fetchApi(`report/create`, {
            method: 'POST',
            body: JSON.stringify({
                companyId: this.state.companyId,
                companyLocation: this.state.companyLocation,
                timeIn: this.state.timeIn,
                timeOut: this.state.timeOut,
                ignoreLunch: this.state.ignoreLunch,
                ignoreDiner: this.state.ignoreDiner,
                ignoreLunchTime: lunchTime,
                ignoreDinerTime: dinerTime,
                totalTime: this.state.totalTime,
                taskInput: this.state.taskInput
            })
        })
            .then(res =>
                this.setState({ currentState: 3, reportId: res.report._id })
            )
            .catch(err => console.error(err));
    }

    render() {
        if (this.state.loading) {
            return <p>Loading...</p>;
        }

        if (this.state.currentState === 0) {
            return (
                <ClientInformations
                    {...this.state}
                    validateState={this.validateState}
                    nextStep={() =>
                        this.setState({
                            currentState: this.state.currentState + 1
                        })
                    }
                    prevStep={() =>
                        this.setState({
                            currentState: this.state.currentState - 1
                        })
                    }
                    handleChange={e => {
                        this.setState({
                            [e.target.name]: e.target.value
                        });
                    }}
                />
            );
        }
        if (this.state.currentState === 1) {
            return (
                <TimesInformations
                    {...this.state}
                    validateState={this.validateState}
                    nextStep={() =>
                        this.setState({
                            currentState: this.state.currentState + 1
                        })
                    }
                    prevStep={() =>
                        this.setState({
                            currentState: this.state.currentState - 1
                        })
                    }
                    handleChange={e => {
                        this.setState({
                            [e.target.name]: e.target.value
                        });
                    }}
                />
            );
        }
        if (this.state.currentState === 2) {
            return (
                <TaskInformations
                    {...this.state}
                    handleSubmit={this.handleSubmit}
                    validateState={this.validateState}
                    nextStep={() =>
                        this.setState({
                            currentState: this.state.currentState + 1
                        })
                    }
                    prevStep={() =>
                        this.setState({
                            currentState: this.state.currentState - 1
                        })
                    }
                    handleChange={e => {
                        this.setState({
                            [e.target.name]: e.target.value
                        });
                    }}
                    handleTaskChange={e => {
                        const items = this.state.taskInput;
                        items[this.state.actualTask][e.target.name] =
                            e.target.value;

                        this.setState({ taskInput: items });
                    }}
                    addNewTask={() => {
                        const items = this.state.taskInput;
                        items.push({
                            taskType: '',
                            productBrand: '',
                            productModel: '',
                            quantity: 0,
                            details: []
                        });
                        this.setState({ taskInput: items });
                    }}
                    cloneTask={() => {
                        const items = [...this.state.taskInput];
                        const itemsDetails = [];
                        for (
                            let index = 0;
                            index < items[this.state.actualTask].details.length;
                            index++
                        ) {
                            itemsDetails.push(
                                JSON.parse(
                                    JSON.stringify(
                                        items[this.state.actualTask].details[
                                            index
                                        ]
                                    )
                                )
                            );
                        }
                        items.push({
                            taskType: this.state.taskInput[
                                this.state.actualTask
                            ].taskType,
                            productBrand: this.state.taskInput[
                                this.state.actualTask
                            ].productBrand,
                            productModel: this.state.taskInput[
                                this.state.actualTask
                            ].productModel,
                            quantity: this.state.taskInput[
                                this.state.actualTask
                            ].quantity,
                            details: itemsDetails
                        });
                        this.setState({ taskInput: items });
                    }}
                    addDetail={() => {
                        const items = this.state.taskInput;
                        items[this.state.actualTask].details.push({
                            taskName: '',
                            taskStatus: 'Done'
                        });
                        this.setState({ taskInput: items });
                    }}
                    removeDetail={index => {
                        const items = this.state.taskInput;
                        items[this.state.actualTask].details.splice(index, 1);
                        this.setState({ taskInput: items });
                    }}
                    editDetail={(e, index) => {
                        const items = this.state.taskInput;
                        items[this.state.actualTask].details[index][
                            e.target.name
                        ] = e.target.value;
                        this.setState({ taskInput: items });
                    }}
                    handlePrevious={() => {
                        this.setState({
                            actualTask: this.state.actualTask - 1
                        });
                    }}
                    handleNext={() => {
                        this.setState({
                            actualTask: this.state.actualTask + 1
                        });
                    }}
                />
            );
        }
        if (this.state.currentState === 3) {
            return (
                <End
                    {...this.state}
                    validateState={this.validateState}
                    nextStep={() =>
                        this.setState({
                            currentState: this.state.currentState + 1
                        })
                    }
                    prevStep={() =>
                        this.setState({
                            currentState: this.state.currentState - 1
                        })
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
