import React from 'react';

const Footer = props => {
    return (
        <div>
            <hr />
            <div className="report-footer">
                {(() => {
                    if (props.state !== 0) {
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
                        if (props.validateState(props.state)) {
                            props.nextStep();
                        }
                    }}
                >
                    {props.state === 2 ? 'Validate' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default Footer;
