import React from 'react';
import Footer from './Footer';

import DateTimePicker from 'react-datetime-picker';

class TimesInformations extends React.Component {
    render() {
        return (
            <div className="report-container">
                <h2>Time Informations</h2>
                <div className="progress">
                    <div
                        className="progress-bar progress-bar-success"
                        role="progressbar"
                        style={{ width: '35%' }}
                    >
                        <span className="sr-only">35% Complete</span>
                    </div>
                </div>

                {(() => {
                    let timeDiff, dinerTime, lunchTime, totalTime;

                    timeDiff = Math.abs(
                        this.props.timeOut.getTime() -
                            this.props.timeIn.getTime()
                    );

                    if (this.props.ignoreDiner) {
                        dinerTime =
                            parseInt(
                                this.props.ignoreDinerTime.split(':')[0],
                                10
                            ) *
                                60 *
                                60 *
                                1000 +
                            parseInt(
                                this.props.ignoreDinerTime.split(':')[1],
                                10
                            ) *
                                60 *
                                1000;
                    } else {
                        dinerTime = 0;
                    }

                    if (this.props.ignoreLunch) {
                        lunchTime =
                            parseInt(
                                this.props.ignoreLunchTime.split(':')[0],
                                10
                            ) *
                                60 *
                                60 *
                                1000 +
                            parseInt(
                                this.props.ignoreLunchTime.split(':')[1],
                                10
                            ) *
                                60 *
                                1000;
                    } else {
                        lunchTime = 0;
                    }

                    totalTime = timeDiff - dinerTime - lunchTime;

                    return (
                        <div>
                            <p>
                                Total Spend :{' '}
                                <span>
                                    {Math.round(totalTime / 1000 / 60 / 60)}
                                </span>
                                <span> / </span>
                                <span>
                                    : {Math.round(totalTime / 1000 / 60)}
                                </span>
                            </p>
                        </div>
                    );
                })()}

                <div className="form-group">
                    <p>Time IN : </p>
                    <DateTimePicker
                        onChange={date =>
                            this.props.handleChange({
                                target: { name: 'timeIn', value: date }
                            })
                        }
                        value={this.props.timeIn}
                    />
                </div>

                <div className="form-group">
                    <p>Time OUT : </p>
                    <DateTimePicker
                        onChange={date =>
                            this.props.handleChange({
                                target: { name: 'timeOut', value: date }
                            })
                        }
                        value={this.props.timeOut}
                    />
                </div>
                <div className="form-group">
                    <p>Ignore Lunch BreakTime : </p>
                    <div className="toggle-radio">
                        <input
                            type="radio"
                            name="rdo"
                            id="yes"
                            onChange={() =>
                                this.props.handleChange({
                                    target: { name: 'ignoreLunch', value: true }
                                })
                            }
                            checked={this.props.ignoreLunch ? true : false}
                        />
                        <input
                            type="radio"
                            name="rdo"
                            id="no"
                            onChange={() =>
                                this.props.handleChange({
                                    target: {
                                        name: 'ignoreLunch',
                                        value: false
                                    }
                                })
                            }
                            checked={!this.props.ignoreLunch ? true : false}
                        />
                        <div className="switch">
                            <label htmlFor="yes">Yes</label>
                            <label htmlFor="no">No</label>
                            <span />
                        </div>
                    </div>
                    {(() => {
                        if (this.props.ignoreLunch) {
                            return (
                                <div className="form-group">
                                    <p>Break Time : </p>
                                    <input
                                        style={{ textAlign: 'center' }}
                                        className="form-control"
                                        type="time"
                                        name="ignoreLunchTime"
                                        value={this.props.ignoreLunchTime}
                                        onChange={this.props.handleChange}
                                    />
                                </div>
                            );
                        }
                    })()}
                </div>
                <div className="form-group">
                    <p>Ignore Dinner BreakTime : </p>
                    <div className="toggle-radio">
                        <input
                            type="radio"
                            name="rdo2"
                            id="yes1"
                            onChange={() =>
                                this.props.handleChange({
                                    target: { name: 'ignoreDiner', value: true }
                                })
                            }
                            checked={this.props.ignoreDiner ? true : false}
                        />
                        <input
                            type="radio"
                            name="rdo2"
                            id="no1"
                            onChange={() =>
                                this.props.handleChange({
                                    target: {
                                        name: 'ignoreDiner',
                                        value: false
                                    }
                                })
                            }
                            checked={!this.props.ignoreDiner ? true : false}
                        />
                        <div className="switch">
                            <label htmlFor="yes1">Yes</label>
                            <label htmlFor="no1">No</label>
                            <span />
                        </div>
                    </div>
                    {(() => {
                        if (this.props.ignoreDiner) {
                            return (
                                <div className="form-group">
                                    <p>Break Time : </p>
                                    <input
                                        style={{ textAlign: 'center' }}
                                        className="form-control"
                                        type="time"
                                        name="ignoreDinerTime"
                                        value={this.props.ignoreDinerTime}
                                        onChange={this.props.handleChange}
                                    />
                                </div>
                            );
                        }
                    })()}
                </div>
                <Footer {...this.props} />
            </div>
        );
    }
}

export default TimesInformations;
