import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Auth from './containers/Auth';
import Main from './containers/Main';
import Add from './containers/Add';
import { Notification, NotFound } from './components';


class App extends Component {
    render() {
        const redirect = this.props.token ? "dashboard" : "auth";

        return (
            <MuiThemeProvider>
                <div className="app">
                    <Switch>
                        <Redirect exact from="/" to={redirect} />
                        <Route path="/auth" component={Auth} />
                        <Route path="/dashboard" component={Main} />
                        <Route path="/add" component={Add} />
                        <Route component={NotFound} />
                    </Switch>
                    <Notification duration={3000} />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withRouter(App);
