import React from 'react';
import { Modal } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import '../../Assets/css/task.css';

function submit(props) {
    confirmAlert({
        title: 'Delete Confirmation',
        message: 'Are you sure you want to delete it ?',
        buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    fetch(`http://localhost:3333/api/task/${props._id}`, {
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

function TaskRow(props) {
    return (
        <tr className="">
            <td className="col-id">{props.index + 1}</td>
            <td className="col-name">{props.taskName} </td>
            <td className="col-task_detail hidden-xs">{props.taskDetail}</td>
            <td className="col-actions">
                <a
                    className="icon_link"
                    style={{ cursor: 'pointer' }}
                    onClick={() => props.displayModal()}
                >
                    <i class="icon_edit far fa-edit" />{' '}
                </a>{' '}
                -{' '}
                <a
                    style={{ cursor: 'pointer' }}
                    className="icon_link"
                    onClick={() => submit(props)}
                >
                    <i className="icon_delete_task far fa-times-circle" />
                </a>
            </td>
        </tr>
    );
}

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
                            Add a task
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            className="modal-input"
                            onChange={this.handleChange}
                            value={this.state.taskName}
                            name="taskName"
                            placeholder="Task Name"
                        />
                        <textarea
                            className="modal-input"
                            onChange={this.handleChange}
                            value={this.state.taskDetail}
                            name="taskDetail"
                            placeholder="Task Detail"
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

class UpdateTaskModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: '',
            taskDetail: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit() {
        fetch(`http://localhost:3333/api/task/${this.props.task._id}`, {
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.success === true) {
                    this.props.onSuccess();
                    this.setState({ taskName: '', taskDetail: '' });
                    this.props.handleHide();
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    componentWillMount() {
        this.setState({
            taskName: this.props.task.taskName,
            taskDetail: this.props.task.taskDetail
        });
    }

    render() {
        return (
            <div className="static-modal">
                <Modal
                    show={this.props.show}
                    onHide={() => this.props.handleHide()}
                    className="modal-container"
                >
                    <Modal.Header className="modal-header" closeButton>
                        <Modal.Title className="modal-title">
                            Update a Task
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            className="modal-input"
                            onChange={this.handleChange}
                            value={this.state.taskName}
                            name="taskName"
                            placeholder="Task Name"
                        />
                        <textarea
                            className="modal-input"
                            onChange={this.handleChange}
                            value={this.state.taskDetail}
                            name="taskDetail"
                            placeholder="Task Details"
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

class Task extends React.Component {
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

    getData() {
        fetch('http://localhost:3333/api/task')
            .then(res => res.json())
            .then(res => {
                if (res.success === true) {
                    this.setState({ tasks: res.tasks, loading: false });
                }
            });
    }

    componentWillMount() {
        this.getData();
    }

    render() {
        const renderTaskRows = () => {
            return this.state.tasks.map((task, index) => {
                return (
                    <TaskRow
                        key={index}
                        {...task}
                        index={index}
                        displayModal={() => {
                            this.setState({
                                modal2State: true,
                                selTask: index
                            });
                        }}
                        onDelete={() => this.getData()}
                    />
                );
            });
        };

        if (this.state.loading === true) {
            return <div>loading....</div>;
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
                {(() => {
                    if (this.state.modal2State) {
                        return (
                            <UpdateTaskModal
                                show={true}
                                handleHide={() => {
                                    this.setState({ modal2State: false });
                                }}
                                onSuccess={() => this.getData()}
                                task={this.state.tasks[this.state.selTask]}
                            />
                        );
                    }
                })()}

                <div className="table-responsive-container">
                    <table className="table table-hover">
                        <caption className="task-caption">
                            {' '}
                            <i className="fas fa-tasks icon_task" />
                            Task List
                        </caption>
                        <thead>
                            <th className="col-id">#</th>
                            <th className="col-name">Task Name</th>
                            <th className="col-task_detail hidden-xs">
                                Details
                            </th>
                            <th className="col-actions ">Actions</th>
                        </thead>

                        <tbody>{renderTaskRows()}</tbody>
                    </table>

                    <a href="/">
                        <button type="button" className="btn btn-danger">
                            Back
                        </button>
                    </a>
                    <button
                        type="button"
                        onClick={() => {
                            this.setState({ modalState: true });
                        }}
                        className="btn btn-success"
                    >
                        Add a task
                    </button>
                </div>
            </div>
        );
    }
}

export default Task;
