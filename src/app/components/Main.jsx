import { Provider } from 'react-redux';
import React from 'react';
import { store } from '../store';
import { ConnectedDashboard } from './Dashboard';
import { Router, Route, Redirect } from "react-router-dom";
// NOTE - Created from history API
import { history } from '../store/history';
import { ConnectedNavigation } from './Navigation';
import { ConnectedTaskListDetail } from './TaskDetail';
import { ConnectedLogin } from './Login';


const RouteGuard = Component => ({ match }) =>
    (!store.getState().session.authenticated) ?
        <Redirect to="/" /> :
        <Component match={match} />


export const Main = () => (
    <Router history={history}>
        <Provider store={store}>
            <div>
                <ConnectedNavigation />
                <Route exact path="/" component={ConnectedLogin} />
                <Route
                    exact
                    path="/dashboard"
                    render={RouteGuard(ConnectedDashboard)}
                />
                <Route
                    exact
                    path="/task/:id"
                    render={RouteGuard(ConnectedTaskListDetail)}
                />
            </div>
        </Provider>
    </Router>

)
