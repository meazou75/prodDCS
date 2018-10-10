import React from 'react';

class RegisterHome extends React.Component {
    render() {
        return (
            <div className="auth-container">
                <h1>Select your registration : </h1>
                <hr />
                <button
                    className="type-button"
                    onClick={() => {
                        this.props.onClick(1);
                    }}
                >
                    Customer Registration
                </button>
                <button
                    className="type-button"
                    onClick={() => {
                        this.props.onClick(2);
                    }}
                >
                    Engineer Registration
                </button>
                <p className="message">
                    Already registered? <a href="/auth/login">Sign In</a>
                </p>
            </div>
        );
    }
}

export default RegisterHome;
