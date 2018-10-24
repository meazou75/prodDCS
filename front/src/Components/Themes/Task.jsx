import React from 'react';

class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeBrand: 0
        };
    }

    componentWillReceiveProps() {
        this.forceUpdate()
    }

    render() {
        const renderTaskOptions = () => {
            return this.props.tasks.map(task => {
                return (
                    <option key={task._id} value={task.taskName}>
                        {task.taskName}
                    </option>
                );
            });
        };

        const renderBrandsOptions = () => {
            return this.props.products.map((product, index) => {
                return (
                    <option key={product._id} value={index}>
                        {product.productBrand}
                    </option>
                );
            });
        };

        const renderProductsOptions = () => {
            if (this.props.products[this.props.activeBrand]) {
                return this.props.products[
                    this.props.activeBrand
                ].productModel.map((model, index) => {
                    return (
                        <option key={model._id} value={model.productModelName}>
                            {model.productModelName}
                        </option>
                    );
                });
            }
        };

        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        Task n°
                        {this.props.actualTask + 1}
                        /{this.props.countTasks}
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="form-group">
                        <p>
                            Task Type <span className="required-text">(*)</span>{' '}
                            :
                        </p>
                        <select
                            name="taskType"
                            value={this.props.task.taskType}
                            onChange={this.props.handleChange}
                            className="form-control"
                        >
                            <option value="" disabled>
                                {' '}
                                Select a task
                            </option>
                            {renderTaskOptions()}
                        </select>
                    </div>
                    <div className="form-group">
                        <p>
                            Product Brand{' '}
                            <span className="required-text">(*)</span> :
                        </p>
                        <select
                            name="productBrand"
                            value={this.props.task.productBrand}
                            onChange={e => {
                                this.setState({
                                    activeBrand: parseInt(e.target.value, 10)
                                });
                                this.props.handleChange(e);
                            }}
                            className="form-control"
                        >
                            <option value="" disabled>
                                {' '}
                                Select a brand
                            </option>
                            {renderBrandsOptions()}
                        </select>
                    </div>
                    <div className="form-group">
                        <p>
                            Product Model{' '}
                            <span className="required-text">(*)</span> :
                        </p>
                        <select
                            name="productModel"
                            value={this.props.task.productModel}
                            onChange={this.props.handleChange}
                            className="form-control"
                        >
                            <option value="" disabled>
                                {' '}
                                Select a model
                            </option>
                            {renderProductsOptions()}
                        </select>
                    </div>
                    <div className="form-group">
                        <p>
                            Device Quantity{' '}
                            <span className="required-text">(*)</span> :{' '}
                        </p>
                        <input
                            className="form-control"
                            type="number"
                            name="quantity"
                            value={this.props.task.quantity}
                            onChange={this.props.handleChange}
                        />
                    </div>
                    {(() => {
                        if (this.props.task.details) {
                            return this.props.task.details.map(
                                (detail, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="row">
                                                <div className="col-md-7 nopad">
                                                    <div className="form-group">
                                                        <p>
                                                            Task Detail{' '}
                                                            <span className="required-text">
                                                                (*)
                                                            </span>{' '}
                                                            :
                                                        </p>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="taskName"
                                                            value={detail.taskName}
                                                            onChange={e => {
                                                                this.props.editDetail(
                                                                    e,
                                                                    index
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <p>
                                                            Status{' '}
                                                            <span className="required-text">
                                                                (*)
                                                            </span>{' '}
                                                            :
                                                        </p>
                                                        <select
                                                            name="taskStatus"
                                                            className="form-control"
                                                            value={detail.taskStatus}
                                                            onChange={e => {
                                                                this.props.editDetail(
                                                                    e,
                                                                    index
                                                                );
                                                            }}
                                                        >
                                                            <option value="Done">
                                                                Done
                                                            </option>
                                                            <option value="Pending">
                                                                Pending
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-1">
                                                    <div className="form-group">
                                                        <p>Actions</p>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger"
                                                            onClick={() => {
                                                                this.props.removeDetail(
                                                                    index
                                                                );
                                                            }}
                                                        >
                                                            X
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            );
                        }
                    })()}
                    <div>
                        <button
                            style={{ float: 'right' }}
                            type="button"
                            className="btn btn-primary"
                            onClick={() => this.props.addDetail()}
                        >
                            Add Task Detail
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Task;
