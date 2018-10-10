import React from 'react';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class ProductModelHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            productBrand: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        this.setState({ productBrand: this.props.productBrand });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.productBrand !== this.state.productBrand) {
            this.setState({ productBrand: nextProps.productBrand });
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleDelete() {
        confirmAlert({
            title: 'Delete Confirmation',
            message: 'Are you sure you want to delete it ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(
                            `http://localhost:3333/api/product/brand/${
                                this.props._id
                            }`,
                            {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                        )
                            .then(res => res.json())
                            .then(res => {
                                if (res.success === true) {
                                    this.props.onDelete();
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

    handleSubmit() {
        fetch(`http://localhost:3333/api/product/brand/${this.props._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                productBrand: this.state.productBrand
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.success === true) {
                    this.setState({ edit: false });
                    this.props.onModify(this.state.value);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return (
            <div className="product-header">
                <i
                    className="icon_edit far fa-edit"
                    onClick={() => this.setState({ edit: true })}
                />
                {(() => {
                    if (this.state.edit) {
                        return (
                            <div style={{ display: 'inline-block' }}>
                                <input
                                    type="text"
                                    value={this.state.productBrand}
                                    onChange={this.handleChange}
                                    name="productBrand"
                                />
                                <button onClick={() => this.handleSubmit()}>
                                    <i className="fas fa-check" />
                                </button>
                            </div>
                        );
                    } else {
                        return this.props.productBrand;
                    }
                })()}

                <i
                    className="icon_delete far fa-times-circle"
                    onClick={() => this.handleDelete()}
                />
            </div>
        );
    }
}

export default ProductModelHeader;
