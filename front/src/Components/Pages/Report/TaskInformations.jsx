import React from 'react';
import Footer from './Footer';
import Task from '../../Themes/Task';

class TaskInformations extends React.Component {
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
                            countTasks={this.props.taskInput.length}
                            task={this.props.taskInput[this.props.actualTask]}
                            handleChange={this.props.handleTaskChange}
                            actualTask={this.props.actualTask}
                            tasks={this.props.tasks}
                            products={this.props.products}
                            addDetail={this.props.addDetail}
                            removeDetail={this.props.removeDetail}
                            editDetail={this.props.editDetail}
                            activeBrand={parseInt(this.props.taskInput[this.props.actualTask].productBrand, 10)}
                        />
                    );
                })()}

                <div style={{ height: '36px' }}>
                    {(() => {
                        if (this.props.actualTask !== 0) {
                            return (
                                <button
                                    style={{
                                        float: 'left',
                                        marginRight: '10px'
                                    }}
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        this.props.handlePrevious();
                                    }}
                                >
                                    Previous
                                </button>
                            );
                        }
                    })()}
                    {(() => {
                        if (
                            this.props.taskInput.length > 1 &&
                            this.props.actualTask !==
                                this.props.taskInput.length - 1
                        ) {
                            return (
                                <button
                                    style={{ float: 'left' }}
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        this.props.handleNext();
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
                            this.props.addNewTask()
                            
                        }}
                    >
                        Add Task
                    </button>
                    <button
                        style={{ float: 'right', marginRight:'15px' }}
                        type="button"
                        className="btn btn-info"
                        onClick={() => {
                            this.props.cloneTask()
                            
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
