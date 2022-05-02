import { takeLatest, put, all, call } from 'redux-saga/effects';

import { USER_ACTIONS } from './user.types';
import {
	signinSuccess,
	signinFailed,
	signUpSuccess,
	signUpFailed,
	signOutSuccess,
	signOutFailure,
} from './user.action';
import {
	getCurrentUser,
	createUserDocfromAuth,
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
	createAuthUserWithEmailAndPassword,
	signOutUser,
} from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalInfo) {
	try {
		const userSnapshot = yield call(
			createUserDocfromAuth,
			userAuth,
			additionalInfo
		);
		yield put(signinSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
	} catch (error) {
		yield put(signinFailed(error));
	}
}
export function* signinWithGoogle() {
	try {
		const { user } = yield call(signInWithGooglePopup);
		yield call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield put(signinFailed(error));
	}
}
export function* signinWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield call(
			signInAuthUserWithEmailAndPassword,
			email,
			password
		);
		yield call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield put(signinFailed(error));
	}
}

export function* signInAfterSignUp({ payload: { user, additionalInfo } }) {
	try {
		yield call(getSnapshotFromUserAuth, user, additionalInfo);
	} catch (error) {
		yield put(signUpFailed(error));
	}
}

export function* signupUser({ payload: { email, password, displayName } }) {
	try {
		const { user } = yield call(
			createAuthUserWithEmailAndPassword,
			email,
			password
		);
		yield put(signUpSuccess(user, { displayName }));
	} catch (error) {
		yield put(signUpFailed(error));
	}
}
export function* signOut() {
	try {
		yield call(signOutUser);
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailure(error));
	}
}
export function* isUserAuthenticated() {
	try {
		const userAuth = yield call(getCurrentUser);
		if (!userAuth) return;
		yield call(getSnapshotFromUserAuth, userAuth);
	} catch (error) {
		yield put(signinFailed(error));
	}
}

export function* onSignOutStart() {
	yield takeLatest(USER_ACTIONS.SIGNOUT_START, signOut);
}
export function* onEmailSigninStart() {
	yield takeLatest(USER_ACTIONS.EMAIL_SIGNIN_START, signinWithEmail);
}
export function* onGoogleSigninStart() {
	yield takeLatest(USER_ACTIONS.GOOGLE_SIGNIN_START, signinWithGoogle);
}
export function* onSignUpSuccess() {
	yield takeLatest(USER_ACTIONS.SIGNUP_SUCCESS, signInAfterSignUp);
}
export function* onSignupUserStart() {
	yield takeLatest(USER_ACTIONS.SIGNUP_USER_START, signupUser);
}
export function* onCheckUserSession() {
	yield takeLatest(USER_ACTIONS.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* userSaga() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSigninStart),
		call(onEmailSigninStart),
		call(onSignupUserStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	]);
}
