import React from 'react';

import { Modal } from 'react-bootstrap';

class AddModelModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            productModelName: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleReset() {
        this.setState({ productModelName: '' });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit() {
        fetch('http://159.89.205.75:3333/api/product/model', {
            method: 'POST',
            body: JSON.stringify({
                _id: this.props._id,
                productModelName: this.state.productModelName
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.success === true) {
                    this.props.onSuccess(res.product);
                    this.handleReset();
                    this.props.handleHide();
                }
            })
            .catch(err => {
                console.error(err);
                this.setState({ brandName: '' });
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
                            Add a Model
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            className="modal-input"
                            onChange={this.handleChange}
                            value={this.state.productModelName}
                            name="productModelName"
                            placeholder="Model Name"
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

export default AddModelModal;