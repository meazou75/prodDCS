import React from 'react';
import { Modal } from 'react-bootstrap';

import '../../Assets/css/engineerList.css';

class AddUserModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            postion: '',
            role: ''
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
        fetch('http://localhost:3333/api/task/', {
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
            <div className="static-modal">
                <Modal
                    show={this.props.show}
                    onHide={() => {
                        this.props.handleHide();
                        this.handleReset();
                    }}
                    className="modal-container"
                >
                    <Modal.Header className="modal-header" closeButton>
                        <Modal.Title className="modal-title">
                            Modify User Informations
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            className="modal-input"
                            onChange={this.handleChange}
                            value={this.state.firstName}
                            name="firstName"
                            placeholder= "First Name"
                        />
                        <input
                            className="modal-input"
                            onChange={this.handleChange}
                            value={this.state.lastName}
                            name="lastName"
                            placeholder="Last Name"
                        />
                        <p style={{ textAlign: 'center' }}>
                            <button
                                className="modal-button-submit"
                                onClick={() => {
                                    this.handleSubmit();
                                }}
                            >
                                Submit
                            </button>
                        </p>
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
            loading: true
        };
    }

    getData() {
        fetch('http://localhost:3333/api/user')
            .then(res => res.json())
            .then(res => {
                if (res.success === true) {
                    this.setState({ user: res.user, loading: false });
                }
            });
    }

    componentWillMount() {
        this.getData();
    }

    render() {
        const engineer = props => {
            return (
                <div className="engineer-row">
                    <div className="engineer-row-name">
                        {' '}
                        <i class="icon_engineerList fas fa-user-circle" />
                        {props.name}
                    </div>
                    <div className="engineer-row-email">
                        <i class="icon_engineerList fas fa-at" />
                        {props.email}
                    </div>
                    <div className="engineer-row-occupation">
                        {props.occupation}
                    </div>
                    <div className="engineer-row-status">{props.status}</div>
                    <i
                        onClick={() => {
                            this.setState({ modalState: true });
                        }}
                        class="modification_icon far fa-edit"
                    />
                    <i class="modification_icon far fa-times-circle" />
                </div>
            );
        };

        const renderUsers = () => {
            return this.state.user.map((user, index) => {
                var role = '';
                if (this.state.user[index].role === 1) {
                    role = 'admin';
                } else role = 'user';
                return (
                    <div key={index} {...user}>
                        {engineer({
                            name:
                                this.state.user[index].firstName +
                                ' ' +
                                this.state.user[index].lastName,
                            email: this.state.user[index].email,
                            occupation: this.state.user[index].position,
                            status: role
                        })}
                    </div>
                );
            });
        };

        return (
            <div>
                <AddUserModal
                    show={this.state.modalState}
                    handleHide={() => {
                        this.setState({ modalState: false });
                    }}
                    onSuccess={task =>
                        this.setState({ tasks: [...this.state.tasks, task] })
                    }
                />
                <div className="container-select-option">
                    <input
                        type="text"
                        className="input-engineerList-option"
                        placeholder="Search"
                    />
                    <i class="icon_search_engineerList fas fa-search" />

                    <select className="select-engineerList-option role">
                        <option value="Engineer">Engineer</option>
                        <option value="Customer">Customer</option>
                    </select>

                    <select className="select-engineerList-option engineer-position">
                        <option value="Manager">Manager</option>
                        <option value="Senior Manager">Senior Manager</option>
                        <option value="Business Representative">
                            Business Representative
                        </option>
                        <option value="Senior Business Representative">
                            Senior Business Representative
                        </option>
                        <option value="Assistant Manager">
                            Assistant Manager
                        </option>
                    </select>
                </div>

                <div className="container-engineer-list">{renderUsers()}</div>
            </div>
        );
    }
}

export default EngineerList;
