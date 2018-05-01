import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/helpers';
import {
    setValidatorEmailError,
    setValidatorConfirmEmailError,
    setValidatorPasswordError,
    setValidatorConfirmPasswordError,
    setStatusLoggingIn,
    resetResponseError,
    loginUser,
    registerUser
} from '../actions/auth';
import { errorMessages as messages } from '../utils/messages';
import {
    AppTitle,
    AuthForm,
    ErrorNotification,
    NotFoundAlt
} from '../components';


class Auth extends Component {
    state = {
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    }

    componentWillMount() {
        // force users to dashboard if logged in
        if (!!this.props.statusAuthorized) {
            this.props.history.push('/dashboard');
        }
    }

    componentDidUpdate() {
        // force users to dashboard if logged in
        if (!!this.props.statusAuthorized) {
            this.props.history.push('/dashboard');
        }
    }

    onChangeEmail = (event) => {
        const email = event.target.value;
        this.setState({ email });
    }
    onChangeConfirmEmail = (event) => {
        const confirmEmail = event.target.value;
        this.setState({ confirmEmail });
    }
    onChangePassword = (event) => {
        const password = event.target.value;
        this.setState({ password });
    }
    onChangeConfirmPassword = (event) => {
        const confirmPassword = event.target.value;
        this.setState({ confirmPassword });
    }

    onLogin = (e) => {
        e.preventDefault();

        // get input values
        const { email, password } = this.state;
        email.toString().trim();

        // validate
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        // (un)set errors
        this.props.setValidatorEmailError(!!emailError ? messages.validEmailError : '');
        this.props.setValidatorPasswordError(!!passwordError ? messages.validPasswordError : '');

        // proceed with logging in if no errors
        if (!emailError && !passwordError) {
            const credentials = { email, password };
            const { history } = this.props;
            this.props.setStatusLoggingIn(true);
            this.props.loginUser(credentials, history);
        }
    }

    onRegister = (e) => {
        e.preventDefault();

        // get input values
        const { email, confirmEmail, password, confirmPassword } = this.state;
        email.toString().trim();

        // validate
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        const confirmEmailError = email !== confirmEmail ? true : false;
        const confirmPasswordError = password !== confirmPassword ? true : false;

        // (un)set errors
        this.props.setValidatorEmailError(!!emailError ? messages.validEmailError : '');
        this.props.setValidatorPasswordError(!!passwordError ? messages.validPasswordError : '');
        this.props.setValidatorConfirmEmailError(!!confirmEmailError ? messages.confirmEmailError : '');
        this.props.setValidatorConfirmPasswordError(!!confirmPasswordError ? messages.confirmPasswordError : '');

        if (!emailError && !passwordError && !confirmEmailError && !confirmPasswordError) {
            const credentials = { email, password };
            const { history } = this.props;
            this.props.setStatusLoggingIn(true);
            this.props.registerUser(credentials, history);
        }
    }

    resetNotificationError = () => {
        this.props.resetResponseError();
    }

    componentWillUnmount() {
        this.setState({
            email: '',
            confirmEmail: '',
            password: '',
            confirmPassword: '',
            responseError: ''
        });
    }

    render() {
        const { email, confirmEmail, password, confirmPassword } = this.state;
        const {
            statusAuthorized,
            statusLoggingIn,
            emailError,
            confirmEmailError,
            passwordError,
            confirmPasswordError,
            responseError,
            match: { url }
        } = this.props;
        const redirect = statusAuthorized ? '/dashboard' : `${url}/login`;

        return (
            <div className="auth-page">
                <AppTitle />
                <Switch>
                    <Redirect exact path={url} to={redirect} />
                    <Route
                        path={`${url}/login`}
                        render={() => (
                            <AuthForm
                                onChangeEmail={this.onChangeEmail}
                                onChangePassword={this.onChangePassword}
                                email={email}
                                password={password}
                                emailError={emailError}
                                passwordError={passwordError}
                                statusLoggingIn={statusLoggingIn}
                                onLogin={this.onLogin}
                            />
                        )}
                    />
                    <Route
                        path={`${url}/register`}
                        render={() => (
                            <AuthForm
                                onChangeEmail={this.onChangeEmail}
                                onChangeConfirmEmail={this.onChangeConfirmEmail}
                                onChangePassword={this.onChangePassword}
                                onChangeConfirmPassword={this.onChangeConfirmPassword}
                                email={email}
                                confirmEmail={confirmEmail}
                                password={password}
                                confirmPassword={confirmPassword}
                                emailError={emailError}
                                confirmEmailError={confirmEmailError}
                                passwordError={passwordError}
                                confirmPasswordError={confirmPasswordError}
                                statusLoggingIn={statusLoggingIn}
                                onRegister={this.onRegister}
                                isRegistering
                            />
                        )}
                    />
                    <Route component={NotFoundAlt} />
                </Switch>
                <ErrorNotification
                    errorMessage={responseError}
                    resetNotificationError={this.resetNotificationError}
                />
            </div>
        );
    }
}


const mapStateToProps = ({ auth }) => ({
    statusLoggingIn: auth.statusLoggingIn,
    statusAuthorized: auth.statusAuthorized,
    emailError: auth.emailError,
    confirmEmailError: auth.confirmEmailError,
    passwordError: auth.passwordError,
    confirmPasswordError: auth.confirmPasswordError,
    responseError: auth.responseError
});

const mapDispatchToProps = (dispatch) => {
    return {
        setValidatorEmailError: (val) => { dispatch(setValidatorEmailError(val)) },
        setValidatorConfirmEmailError: (val) => { dispatch(setValidatorConfirmEmailError(val)) },
        setValidatorPasswordError: (val) => { dispatch(setValidatorPasswordError(val)) },
        setValidatorConfirmPasswordError: (val) => { dispatch(setValidatorConfirmPasswordError(val)) },
        setStatusLoggingIn: (val) => { dispatch(setStatusLoggingIn(val)) },
        resetResponseError: (val) => { dispatch(resetResponseError()) },
        loginUser: (credentials, history) => { dispatch(loginUser(credentials, history)) },
        registerUser: (credentials, history) => { dispatch(registerUser(credentials, history)) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
