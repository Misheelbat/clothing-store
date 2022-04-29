import { createActions } from '../../utils/reducer/reducer.utils';
import { USER_ACTIONS } from './user.types';

export const setCurrentUser = (user) =>
	createActions(USER_ACTIONS.SET_CURRENT_USER, user);

export const checkUserSession = () =>
	createActions(USER_ACTIONS.CHECK_USER_SESSION);

export const googleSigninStart = () =>
	createActions(USER_ACTIONS.GOOGLE_SIGNIN_START);

export const emailSigninStart = (email, password) =>
	createActions(USER_ACTIONS.EMAIL_SIGNIN_START, { email, password });

export const signinSuccess = (user) =>
	createActions(USER_ACTIONS.SIGNIN_SUCCESS, user);

export const signinFailed = (error) =>
	createActions(USER_ACTIONS.SIGNIN_FAILURE, error);

export const signupUserStart = (email, password, displayName) =>
	createActions(USER_ACTIONS.SIGNUP_USER_START, {
		email,
		password,
		displayName,
	});

export const signUpSuccess = (user, additionalInfo) =>
	createActions(USER_ACTIONS.SIGNUP_SUCCESS, { user, additionalInfo });

export const signUpFailed = (error) =>
	createActions(USER_ACTIONS.SIGNUP_FAILURE, error);

export const signOutStart = () => createActions(USER_ACTIONS.SIGNOUT_START);
export const signOutSuccess = () => createActions(USER_ACTIONS.SIGNOUT_SUCCESS);
export const signOutFailure = (error) =>
	createActions(USER_ACTIONS.SIGNOUT_FAILURE, error);
