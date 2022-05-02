import { takeLatest, put, all, call } from 'typed-redux-saga/macro';
import { User } from 'firebase/auth';
import { USER_ACTIONS } from './user.types';
import {
	signinSuccess,
	signinFailed,
	signUpSuccess,
	signUpFailed,
	signOutSuccess,
	signOutFailure,
	EmailSigninStart,
	SignUpSuccess,
	SignupUserStart,
} from './user.action';
import {
	getCurrentUser,
	createUserDocfromAuth,
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
	createAuthUserWithEmailAndPassword,
	signOutUser,
	AdditionalInfo,
} from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(
	userAuth: User,
	additionalInfo?: AdditionalInfo
) {
	try {
		const userSnapshot = yield* call(
			createUserDocfromAuth,
			userAuth,
			additionalInfo
		);
		if (userSnapshot) {
			yield* put(
				signinSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
			);
		}
	} catch (error) {
		yield* put(signinFailed(error as Error));
	}
}
export function* signinWithGoogle() {
	try {
		const { user } = yield* call(signInWithGooglePopup);
		yield* call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield* put(signinFailed(error as Error));
	}
}
export function* signinWithEmail({
	payload: { email, password },
}: EmailSigninStart) {
	try {
		const userCredential = yield* call(
			signInAuthUserWithEmailAndPassword,
			email,
			password
		);
		if (userCredential) {
			const { user } = userCredential;
			yield* call(getSnapshotFromUserAuth, user);
		}
	} catch (error) {
		yield* put(signinFailed(error as Error));
	}
}

export function* signInAfterSignUp({
	payload: { user, additionalInfo },
}: SignUpSuccess) {
	try {
		yield* call(getSnapshotFromUserAuth, user, additionalInfo);
	} catch (error) {
		yield* put(signUpFailed(error as Error));
	}
}

export function* signupUser({
	payload: { email, password, displayName },
}: SignupUserStart) {
	try {
		const userCredential = yield* call(
			createAuthUserWithEmailAndPassword,
			email,
			password
		);
		if (userCredential) {
			const { user } = userCredential;
			yield* put(signUpSuccess(user, { displayName }));
		}
	} catch (error) {
		yield* put(signUpFailed(error as Error));
	}
}
export function* signOut() {
	try {
		yield* call(signOutUser);
		yield* put(signOutSuccess());
	} catch (error) {
		yield* put(signOutFailure(error as Error));
	}
}
export function* isUserAuthenticated() {
	try {
		const userAuth = yield* call(getCurrentUser);
		if (!userAuth) return;
		yield* call(getSnapshotFromUserAuth, userAuth);
	} catch (error) {
		yield* put(signinFailed(error as Error));
	}
}

export function* onSignOutStart() {
	yield* takeLatest(USER_ACTIONS.SIGNOUT_START, signOut);
}
export function* onEmailSigninStart() {
	yield* takeLatest(USER_ACTIONS.EMAIL_SIGNIN_START, signinWithEmail);
}
export function* onGoogleSigninStart() {
	yield* takeLatest(USER_ACTIONS.GOOGLE_SIGNIN_START, signinWithGoogle);
}
export function* onSignUpSuccess() {
	yield* takeLatest(USER_ACTIONS.SIGNUP_SUCCESS, signInAfterSignUp);
}
export function* onSignupUserStart() {
	yield* takeLatest(USER_ACTIONS.SIGNUP_USER_START, signupUser);
}
export function* onCheckUserSession() {
	yield* takeLatest(USER_ACTIONS.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* userSaga() {
	yield* all([
		call(onCheckUserSession),
		call(onGoogleSigninStart),
		call(onEmailSigninStart),
		call(onSignupUserStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	]);
}
