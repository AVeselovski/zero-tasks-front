import {
    SET_VALIDATOR_EMAIL_ERROR,
    SET_VALIDATOR_CONFIRM_EMAIL_ERROR,
    SET_VALIDATOR_PASSWORD_ERROR,
    SET_VALIDATOR_CONFIRM_PASSWORD_ERROR,
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
} from '../utils/constants';

export const setValidatorEmailError = emailError => ({
    type: SET_VALIDATOR_EMAIL_ERROR,
    payload: emailError,
});

export const setValidatorConfirmEmailError = confirmEmailError => ({
    type: SET_VALIDATOR_CONFIRM_EMAIL_ERROR,
    payload: confirmEmailError,
});

export const setValidatorPasswordError = passwordError => ({
    type: SET_VALIDATOR_PASSWORD_ERROR,
    payload: passwordError,
});

export const setValidatorConfirmPasswordError = confirmPasswordError => ({
    type: SET_VALIDATOR_CONFIRM_PASSWORD_ERROR,
    payload: confirmPasswordError,
});

// init login saga
export const loginUser = (credentials, history) => ({
    type: LOGIN_USER,
    payload: { credentials, history },
});

// init register saga
export const registerUser = (credentials, history) => ({
    type: REGISTER_USER,
    payload: { credentials, history },
});

export const logoutUser = () => ({
    type: LOGOUT_USER,
});
