/* Library Import */

import React from 'react';

/* Components Import */

/* Css Import */

/* RegisterSuccess */

class RegisterSuccess extends React.Component {
    render() {
        return (
            <div className="auth-container">
                <h1>Registration Success ! </h1>
                <hr />
                <div className="successfully-register">
                    <img alt="Finished" src="/img/graphic-confirmation-2.svg" />
                    <h2>Your Account has been successfully created ! </h2>
                    <p>
                        For security reasons, we have to check your profile
                        before allow you to login on the Plateforme this can
                        take more than 24 hours.
                    </p>
                    <a href="/auth/login">
                        <button
                            type="button"
                            className="btn btn-primary btn-lg"
                        >
                            HOME
                        </button>
                    </a>
                </div>
            </div>
        );
    }
}

export default RegisterSuccess;
