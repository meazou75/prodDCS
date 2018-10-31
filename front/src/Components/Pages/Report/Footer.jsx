import React from 'react';

const Footer = props => {
    return (
        <div>
            <hr />
            <div className="report-footer">
                {(() => {
                    if (props.currentState !== 0) {
                        return (
                            <button
                                style={{ float: 'left' }}
                                onClick={() => {
                                    props.prevStep();
                                }}
                                className="btn btn-danger"
                            >
                                Back
                            </button>
                        );
                    }
                })()}
                <button
                    style={{ float: 'right' }}
                    className="btn btn-success"
                    onClick={() => {
                        if (props.validateState(props.currentState)) {
                            if(props.currentState === 2) {
                                props.handleSubmit();
                            } else {
                                props.nextStep();
                            }
                        }
                    }}
                >
                    {props.currentState === 2 ? 'Validate' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default Footer;
