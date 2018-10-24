import React from 'react';
import Footer from './Footer';
import Task from '../../Themes/Task';

class TaskInformations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [
                {
                    taskType: '',
                    productBrand: '',
                    productModel: '',
                    quantity: 0,
                    details: []
                }
            ],
            activeBrand: '0',
            actualTask: 0
        };
    }

    render() {
        return (
            <div className="report-container">
                <h2>Tasks Informations</h2>
                <div className="progress">
                    <div
                        className="progress-bar progress-bar-success"
                        role="progressbar"
                        style={{ width: '60%' }}
                    >
                        <span className="sr-only">60% Complete</span>
                    </div>
                </div>

                {(() => {
                    return (
                        <Task
                            countTasks={this.state.tasks.length}
                            task={this.state.tasks[this.state.actualTask]}
                            handleChange={e => {
                                const items = this.state.tasks;
                                items[this.state.actualTask][e.target.name] =
                                    e.target.value;

                                this.setState({ tasks: items });
                            }}
                            actualTask={this.state.actualTask}
                            tasks={this.props.tasks}
                            products={this.props.products}
                            addDetail={() => {
                                const items = this.state.tasks;
                                items[this.state.actualTask].details.push({
                                    taskName: '',
                                    taskStatus: 'Done'
                                });
                                this.setState({ tasks: items });
                            }}
                            removeDetail={index => {
                                const items = this.state.tasks;
                                items[this.state.actualTask].details.splice(
                                    index,
                                    1
                                );
                                this.setState({ tasks: items });
                            }}
                            editDetail={(e, index) => {
                                const items = this.state.tasks;
                                items[this.state.actualTask].details[index][
                                    e.target.name
                                ] = e.target.value;
                                this.setState({ tasks: items });
                            }}
                            activeBrand={parseInt(this.state.tasks[this.state.actualTask].productBrand, 10)}
                        />
                    );
                })()}

                <div style={{ height: '36px' }}>
                    {(() => {
                        if (this.state.actualTask !== 0) {
                            return (
                                <button
                                    style={{
                                        float: 'left',
                                        marginRight: '10px'
                                    }}
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        this.setState({
                                            actualTask:
                                                this.state.actualTask - 1
                                        });
                                    }}
                                >
                                    Previous
                                </button>
                            );
                        }
                    })()}
                    {(() => {
                        if (
                            this.state.tasks.length > 1 &&
                            this.state.actualTask !==
                                this.state.tasks.length - 1
                        ) {
                            return (
                                <button
                                    style={{ float: 'left' }}
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        this.setState({
                                            actualTask:
                                                this.state.actualTask + 1
                                        });
                                    }}
                                >
                                    Next
                                </button>
                            );
                        }
                    })()}

                    <button
                        style={{ float: 'right' }}
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            const items = this.state.tasks;
                            items.push({
                                taskType: '',
                                productBrand: '',
                                productModel: '',
                                quantity: 0,
                                details: []
                            });
                            this.setState({ tasks: items });
                            
                        }}
                    >
                        Add Task
                    </button>
                    <button
                        style={{ float: 'right', marginRight:'15px' }}
                        type="button"
                        className="btn btn-info"
                        onClick={() => {
                            const items = [...this.state.tasks];
                            const itemsDetails = [];
                            for (let index = 0; index < items[this.state.actualTask].details.length; index++) {
                                itemsDetails.push(JSON.parse(JSON.stringify(items[this.state.actualTask].details[index])))
                            }
                            items.push({
                                taskType: this.state.tasks[this.state.actualTask].taskType,
                                productBrand: this.state.tasks[this.state.actualTask].productBrand,
                                productModel: this.state.tasks[this.state.actualTask].productModel,
                                quantity: this.state.tasks[this.state.actualTask].quantity,
                                details: itemsDetails
                            });
                            this.setState({ tasks: items });
                            
                        }}
                    >
                        Clone Task
                    </button>
                </div>
                <Footer {...this.props} />
            </div>
        );
    }
}

export default TaskInformations;
