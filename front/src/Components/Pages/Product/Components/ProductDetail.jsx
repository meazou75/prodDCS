import React from 'react';

import ProductTextInput from './ProductTextInput';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false
        };
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
                            `http://localhost:3333/api/product/model/${
                                this.props._id
                            }`,
                            {
                                method: 'DELETE',
                                body: JSON.stringify({
                                    _id: this.props.idProduct
                                }),
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

    render() {
        return (
            <div className="product-detail">
                <i
                    className="icon_delete far fa-times-circle"
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.handleDelete()}
                />
                <i
                    className="icon_edit far fa-edit"
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.setState({ edit: true })}
                />
                <ProductTextInput
                    className="textInput"
                    reinit={() => this.setState({ edit: false })}
                    name="productModelName"
                    id={this.props._id}
                    edit={this.state.edit}
                    value={this.props.productModelName}
                    idProduct={this.props.idProduct}
                    onModify={this.props.onModify}
                />
            </div>
        );
    }
}

export default ProductDetail;
