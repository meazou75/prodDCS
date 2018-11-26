import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import '../../Assets/css/engineerList.css';

import { endpoint } from '../../Constants';

import { fetchApi } from '../../Service/NetworkService';

import { addNotification } from '../../Redux/Actions';

import { confirmAlert } from 'react-confirm-alert'; // Import

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class AddTaskModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: '',
            activation: '',
            firstName: '',
            lastName: '',
            email: '',
            position: '',
            company: '',
            role: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        this.setState({
            activation: this.props.user.activation
                ? 'true'
                : 'false',
            firstName: this.props.user.firstName
                ? this.props.user.firstName
                : null,
            lastName: this.props.user.lastName
                ? this.props.user.lastName
                : null,
            email: this.props.user.email ? this.props.user.email : null,
            position: this.props.user.position
                ? this.props.user.position
                : null,
            company: this.props.user.company ? this.props.user.company : null,
            role: this.props.user.role ? this.props.user.role : null
        });
    }

    handleSubmit() {
        const { firstName, lastName, email, position, company } = this.state;

        const role = parseInt(this.state.role, 10);

        const activation = this.state.activation === 'true';

        fetchApi(`/user/${this.props.user._id}`, {
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                position,
                company,
                activation,
                role
            }),
            method: 'PUT'
        })
            .then(() => {
                this.props.onSuccess();
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div className="static-modal-engineerList">
                <Modal
                    show={this.props.show}
                    onHide={() => {
                        this.props.handleHide();
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
                                    className="profile-name-input"
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
                                    className="profile-surname-input"
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
                                <select
                                    name="role"
                                    value={this.state.role}
                                    onChange={this.handleChange}
                                >
                                    <option value="0">Customer</option>
                                    <option value="1">Engineer</option>
                                    <option value="2">Admin</option>
                                </select>
                                <i className="user_icon fas fa-check" />
                                <label className="profile-input-label">
                                    Activation
                                </label>
                                <select
                                    name="activation"
                                    value={this.state.activation}
                                    onChange={this.handleChange}
                                >
                                    <option value="true">Activated</option>
                                    <option value="false">Locked</option>
                                </select>
                            </div>
                            <button
                                className="profile-password-button-profil"
                                onClick={this.handleSubmit}
                            >
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
            loading: true,
            option: 'All',
            selected_user: 0
        };

        this.handleChange = this.handleChange.bind(this);
    }

    submitDelete(props) {
        confirmAlert({
            title: 'Delete Confirmation',
            message: 'Are you sure you want to delete this user ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        console.log(props);
                        fetchApi(`user/${props}`, {
                            method: 'DELETE'
                        })
                            .then(res => {
                                if (res.success === true) {
                                    this.getData();
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
                console.log(user)
                return (
                    <tr key={index} {...user}>
                        <td scope="row">
                            {user.firstName +
                                ' ' +
                                user.lastName}
                        </td>
                        <td scope="row">{user.email}</td>
                        <td scope="row">{user.position}</td>
                        <td scope="row">
                            {user.role === 2
                                ? 'admin'
                                : user.role === 0 ? 'cust' : 'eng'}
                        </td>

                        <td scope="row">
                            {user.activation ? 'Yes' : 'No'}
                        </td>
                        <td scope="row">
                            <i
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    this.setState({
                                        modalState: true,
                                        selected_user: index
                                    });
                                }}
                                className="modification_icon far fa-edit"
                            />
                            <i
                                className="modification_icon far fa-times-circle"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    this.submitDelete(
                                        user._id
                                    );
                                    console.log(user._id);
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
                {(() => {
                    if (this.state.modalState)
                        return (
                            <AddTaskModal
                                show={this.state.modalState}
                                handleHide={() => {
                                    this.setState({ modalState: false });
                                }}
                                onSuccess={() => {
                                    this.getData();
                                    this.setState({ modalState: false });
                                    this.props.addNotification({
                                        title: "You've successfully updated the user",
                                        color: '#28cdbf'
                                    });
                                }}
                                user={this.state.user[this.state.selected_user]}
                            />
                        );
                })()}

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

export default connect(
    null,
    { addNotification }
)(EngineerList);
