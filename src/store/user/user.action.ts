import {
	createActions,
	withMatcher,
	Action,
	ActionWithPayload,
} from '../../utils/reducer/reducer.utils';
import { USER_ACTIONS } from './user.types';
import { UserData, AdditionalInfo } from '../../utils/firebase/firebase.utils';
import { User } from 'firebase/auth';

export type CheckUserSession = Action<USER_ACTIONS.CHECK_USER_SESSION>;

export type GoogleSigninStart = Action<USER_ACTIONS.GOOGLE_SIGNIN_START>;

export type EmailSigninStart = ActionWithPayload<
	USER_ACTIONS.EMAIL_SIGNIN_START,
	{ email: string; password: string }
>;

export type SigninSuccess = ActionWithPayload<
	USER_ACTIONS.SIGNIN_SUCCESS,
	UserData
>;

export type SigninFailed = ActionWithPayload<
	USER_ACTIONS.SIGNIN_FAILURE,
	Error
>;

export type SignupUserStart = ActionWithPayload<
	USER_ACTIONS.SIGNUP_USER_START,
	{ email: string; password: string; displayName: string }
>;

export type SignUpSuccess = ActionWithPayload<
	USER_ACTIONS.SIGNUP_SUCCESS,
	{ user: User; additionalInfo: AdditionalInfo }
>;

export type SignUpFailed = ActionWithPayload<
	USER_ACTIONS.SIGNUP_FAILURE,
	Error
>;

export type SignOutStart = Action<USER_ACTIONS.SIGNOUT_START>;
export type SignOutSuccess = Action<USER_ACTIONS.SIGNOUT_SUCCESS>;
export type SignOutFailure = ActionWithPayload<
	USER_ACTIONS.SIGNOUT_FAILURE,
	Error
>;

export const checkUserSession = withMatcher(
	(): CheckUserSession => createActions(USER_ACTIONS.CHECK_USER_SESSION)
);

export const googleSigninStart = withMatcher(
	(): GoogleSigninStart => createActions(USER_ACTIONS.GOOGLE_SIGNIN_START)
);
export const emailSigninStart = withMatcher(
	(email: string, password: string): EmailSigninStart =>
		createActions(USER_ACTIONS.EMAIL_SIGNIN_START, { email, password })
);

export const signinSuccess = withMatcher(
	(user: UserData & { id: string }): SigninSuccess =>
		createActions(USER_ACTIONS.SIGNIN_SUCCESS, user)
);

export const signinFailed = withMatcher(
	(error: Error): SigninFailed =>
		createActions(USER_ACTIONS.SIGNIN_FAILURE, error)
);

export const signupUserStart = withMatcher(
	(email: string, password: string, displayName: string) =>
		createActions(USER_ACTIONS.SIGNUP_USER_START, {
			email,
			password,
			displayName,
		})
);

export const signUpSuccess = withMatcher(
	(user: User, additionalInfo: AdditionalInfo): SignUpSuccess =>
		createActions(USER_ACTIONS.SIGNUP_SUCCESS, { user, additionalInfo })
);

export const signUpFailed = withMatcher(
	(error: Error): SignUpFailed =>
		createActions(USER_ACTIONS.SIGNUP_FAILURE, error)
);

export const signOutStart = withMatcher(
	(): SignOutStart => createActions(USER_ACTIONS.SIGNOUT_START)
);

export const signOutSuccess = withMatcher(
	(): SignOutSuccess => createActions(USER_ACTIONS.SIGNOUT_SUCCESS)
);

export const signOutFailure = withMatcher(
	(error: Error): SignOutFailure =>
		createActions(USER_ACTIONS.SIGNOUT_FAILURE, error)
);
