import React from 'react';
import { Modal } from 'react-bootstrap';

import '../../Assets/css/engineerList.css';

import { endpoint } from '../../Constants';

import { fetchApi } from '../../Service/NetworkService'; 

class AddTaskModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            taskName: '',
            taskDetail: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleReset() {
        this.setState({ taskName: '', taskDetail: '' });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit() {
        fetch(`${endpoint}/task/`, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.success === true) {
                    this.props.onSuccess(res.task);
                    this.setState({ taskName: '', taskDetail: '' });
                    this.props.handleHide();
                }
            })
            .catch(err => {
                console.error(err);
                this.setState({ taskName: '', taskDetail: '' });
            });
    }

    render() {
        return (
            <div className="static-modal-engineerList">
                <Modal
                    show={this.props.show}
                    onHide={() => {
                        this.props.handleHide();
                        this.handleReset();
                    }}
                    className="modal-container-engineerList"
                >
                    <Modal.Header className="modal-header" closeButton>
                        <Modal.Title className="modal-title">
                            Modify Information
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="profile-container-content">
                            <div className="profile-container-name">
                                <i className="fas fa-user-circle user_icon" />
                                <label className="profile-input-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="profile-name-input"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                />
                                <i className="fas fa-user-circle user_icon" />
                                <label className="profile-input-label">
                                    Surname
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="profile-surname-input"
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="profile-container-name">
                                <i class="fas fa-at user_icon" />
                                <label className="profile-input-label">
                                    E-mail
                                </label>
                                <input
                                    className="profile-name-input email"
                                    type="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="profile-container-name">
                                <i class="fas fa-graduation-cap user_icon" />
                                <label className="profile-input-label">
                                    Position
                                </label>
                                <input
                                    disabled
                                    className="profile-name-input disabled"
                                    type="text"
                                    name="position"
                                    value={this.state.position}
                                    onChange={this.handleChange}
                                />
                                <i class="fas fa-building user_icon" />
                                <label className="profile-input-label">
                                    Company
                                </label>
                                <input
                                    disabled={this.state.company ? false : true}
                                    className={
                                        this.state.company
                                            ? 'profile-surname-input'
                                            : 'profile-surname-input disabled'
                                    }
                                    type="text"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="profile-container-name">
                                <i className="user_icon fas fa-user-shield" />
                                <label className="profile-input-label">
                                    Status
                                </label>
                                <input
                                    disabled
                                    className="profile-name-input disabled"
                                    type="text"
                                    name="position"
                                    value={this.state.position}
                                    onChange={this.handleChange}
                                />
                                <i className="user_icon fas fa-check" />
                                <label className="profile-input-label">
                                    Activation
                                </label>
                                <input
                                    disabled={this.state.company ? false : true}
                                    className={
                                        this.state.company
                                            ? 'profile-surname-input'
                                            : 'profile-surname-input disabled'
                                    }
                                    type="text"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <button className="profile-password-button-profil">
                                Submit
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

class EngineerList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            activeProduct: 0,
            modalState: false,
            modalState2: false,
            loading: true,
            option: 'All'
        };

        this.handleChange = this.handleChange.bind(this);
    }

    getData() {
        if (this.state.option === 'All') {
            fetch(`${endpoint}/user`)
                .then(res => res.json())
                .then(res => {
                    if (res.success === true) {
                        this.setState({ user: res.user, loading: false });
                    }
                });
        } else if (this.state.option === 'Customer') {
            fetch(`${endpoint}/user/customer`)
                .then(res => res.json())
                .then(res => {
                    if (res.success === true) {
                        this.setState({ user: res.user, loading: false });
                    }
                });
        } else if (this.state.option === 'Engineer') {
            fetch(`${endpoint}/user/engineer`)
                .then(res => res.json())
                .then(res => {
                    if (res.success === true) {
                        this.setState({ user: res.user, loading: false });
                    }
                });
        }
    }

    componentWillMount() {
        this.getData();
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => {
            this.getData();
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.option);
    };

    render() {
        const renderUsers = () => {
            return this.state.user.map((user, index) => {
                return (
                    <tr key={index} {...user}>
                        <td scope="row">
                            {this.state.user[index].firstName +
                                ' ' +
                                this.state.user[index].lastName}
                        </td>
                        <td scope="row">{this.state.user[index].email}</td>
                        <td scope="row">{this.state.user[index].position}</td>
                        <td scope="row">
                            {this.state.user[index].role === 1
                                ? 'admin'
                                : 'user'}
                        </td>

                        <td scope="row">
                            {this.state.user[index].activation ? 'Yes' : 'No'}
                        </td>
                        <td scope="row">
                            <i
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    this.setState({ modalState: true });
                                }}
                                className="modification_icon far fa-edit"
                            />
                            <i
                                className="modification_icon far fa-times-circle"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    fetchApi(`user/${user._id}`, {
                                        method: 'DELETE'
                                    })
                                        .then(res => this.getData())
                                        .catch(err => console.error(err));
                                }}
                            />
                        </td>
                    </tr>
                );
            });
        };

        const filterUpdated = (newData, filterConfiguration) => {
            this.setState({
                upddatedData: newData
            });
        };

        if (this.state.loading) {
            return <p>Loading</p>;
        }

        return (
            <div>
                <AddTaskModal
                    show={this.state.modalState}
                    handleHide={() => {
                        this.setState({ modalState: false });
                    }}
                    onSuccess={task =>
                        this.setState({ tasks: [...this.state.tasks, task] })
                    }
                />
                <div className="container-select-option">
                    <select
                        name="option"
                        value={this.state.option}
                        onChange={this.handleChange}
                        className="input-engineerList-option"
                    >
                        <option value="All">All</option>
                        <option value="Engineer">Engineer</option>
                        <option value="Customer">Customer</option>
                    </select>
                </div>

                <div className="container-engineer-list">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <i className="icon_engineerList fas fa-user-circle" />
                                    Name
                                </th>
                                <th scope="col">
                                    <i className="icon_engineerList fas fa-at" />
                                    E-mail
                                </th>
                                <th scope="col">
                                    <i className="icon_engineerList fas fa-graduation-cap" />
                                    Occupation
                                </th>
                                <th scope="col">
                                    <i className="icon_engineerList fas fa-user-shield" />
                                    Status
                                </th>
                                <th scope="col">
                                    <i className="icon_engineerList fas fa-check" />
                                    Activation
                                </th>
                                <th scope="col">
                                    <i className="icon_engineerList fas fa-exclamation" />
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>{renderUsers()}</tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default EngineerList;
