import React from 'react';
import { Route } from 'react-router-dom';

import Dashboard from '../Pages/Dashboard';
import Report from '../Pages/Report/index';
import Task from '../Pages/Task';
import Profil from '../Pages/Profil';
import ProfilSecurity from '../Pages/ProfilSecurity';
import Customer from '../Pages/Customer';
import Product from '../Pages/Product/';
import EngineerList from '../Pages/EngineerList';

import '../../Assets/css/layout.css';
import '../../Assets/css/accueil.css';

import NavBar from './NavBar';

import withAuth from '../../Service/withAuth';

class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navbarExpanded: false
        };
    }

    render() {
        return (
            <div>
                <NavBar
                    expand={this.state.navbarExpanded}
                    expandAction={() => {
                        this.setState({
                            navbarExpanded: !this.state.navbarExpanded
                        });
                    }}
                    {...this.props}
                />
                <div className="content-container">
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/report" component={Report} />
                    <Route exact path="/task" component={Task} />
                    <Route exact path="/profile" component={Profil} />
                    <Route exact path="/product" component={Product} />
                    <Route exact path="/engineer_list" component={EngineerList}/>
                    <Route exact path="/profile/security" component={ProfilSecurity} />
                    <Route exact path="/profile/report" component={Customer} />
                </div>
            </div>
        );
    }
}

export default withAuth(Layout);
