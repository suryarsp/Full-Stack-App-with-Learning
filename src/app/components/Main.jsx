import { Provider } from 'react-redux';
import React from 'react';
import { store } from '../store';
import { ConnectedDashboard } from './Dashboard';
import { Router, Route } from "react-router-dom";
// NOTE - Created from history API
import { history } from '../store/history';
import { ConnectedNavigation } from './Navigation';
import { ConnectedTaskListDetail } from './TaskDetail';

export const Main = () => (
    <Router history={history}>
        <Provider store={store}>
            <div>
            <ConnectedNavigation />
                <Route
                    exact
                    path="/dashboard"
                    render={() => (<ConnectedDashboard />)}
                />
                <Route
                    exact
                    path="/task/:id"
                    render={({match}) => (<ConnectedTaskListDetail match={match} />)}
                />
            </div>
        </Provider>
    </Router>

)
