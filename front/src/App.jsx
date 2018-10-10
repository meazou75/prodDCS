import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './Redux/Reducers';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthLayout from './Components/Layout/AuthLayout';
import Layout from './Components/Layout/Layout';
import NotificationManager from './Components/Layout/NotificationManager';

import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    }

    render() {
        return (
            <Provider store={this.store}>
                <Router>
                    <div>
                        <NotificationManager />
                        <Switch>
                            <Route
                                exact
                                path="/auth/login"
                                component={AuthLayout}
                            />
                            <Route
                                exact
                                path="/auth/register"
                                component={AuthLayout}
                            />
                            <Route path="/" component={Layout} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
