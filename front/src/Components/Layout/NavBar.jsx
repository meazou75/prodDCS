import React from 'react';

import { NavLink } from 'react-router-dom';
import AuthService from '../../Service/AuthService';

import '../../Assets/css/layout.css';

const Auth = new AuthService();

class NavBar extends React.Component {
    render() {
        return (
            <div className="navbar-container">
                <div className="logo-container">
                    <img
                        src="https://via.placeholder.com/170x70"
                        alt="logo-dcs"
                        className="logo-DCS"
                    />
                </div>
                <p className="nav-button-container hidden-lg hidden-md">
                    <button
                        onClick={() => {
                            this.props.expandAction();
                        }}
                        className="nav-button"
                    >
                        <i
                            className={
                                this.props.expand
                                    ? 'fas fa-arrow-circle-up'
                                    : 'fas fa-arrow-circle-down'
                            }
                        />
                    </button>
                </p>

                <div className="nav-desktop hidden-xs hidden-sm">
                    <NavLink to="#" activeClassName="active">
                        <button
                            onClick={() => {
                                Auth.logout();
                                this.props.history.replace('/auth/login');
                            }}
                        >
                            <i className="fas fa-sign-out-alt" />
                            Logout
                        </button>
                    </NavLink>
                    <NavLink to="/profil" activeClassName="active">
                        <button>
                            <i className="fas fa-user-circle" />
                            Profil
                        </button>
                    </NavLink>
                    <NavLink to="/report" activeClassName="active">
                        <button>
                            <i className="fas fa-file-alt" />
                            Report
                        </button>
                    </NavLink>

                    <NavLink to="/dashboard" activeClassName="active">
                        <button>
                            <i className="fas fa-tachometer-alt" />
                            Dashboard
                        </button>
                    </NavLink>
                </div>

                <div
                    className="nav-responsive hidden-lg hidden-md"
                    style={{
                        top: this.props.expand ? '124px' : '-500px'
                    }}
                >
                    <NavLink to="/dashboard" activeClassName="active">
                        <button>
                            <i className="fas fa-tachometer-alt" />
                            Dashboard
                        </button>
                    </NavLink>
                    <NavLink to="/report" activeClassName="active">
                        <button>
                            <i className="fas fa-file-alt" />
                            Report
                        </button>
                    </NavLink>
                    <NavLink to="/profil" activeClassName="active">
                        <button>
                            <i className="fas fa-user-circle" />
                            Profil
                        </button>
                    </NavLink>
                    <NavLink to="#" activeClassName="active">
                        <button
                            onClick={() => {
                                Auth.logout();
                                this.props.history.replace('/auth/login');
                            }}
                        >
                            <i className="fas fa-sign-out-alt" />
                            Logout
                        </button>
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default NavBar;
