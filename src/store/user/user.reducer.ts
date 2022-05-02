import { AnyAction } from 'redux';
import { USER_ACTIONS } from './user.types';
import { UserData } from '../../utils/firebase/firebase.utils';
import {
	signinFailed,
	signOutFailure,
	signUpFailed,
	signinSuccess,
	signOutSuccess,
} from './user.action';

export type UserState = {
	readonly currentUser: UserData | null;
	readonly isLoading: boolean;
	readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
	if (signinSuccess.match(action)) {
		return {
			...state,
			currentUser: action.payload,
		};
	}

	if (signOutSuccess.match(action)) {
		return { ...state, currentUser: null };
	}

	if (
		signOutFailure.match(action) ||
		signUpFailed.match(action) ||
		signinFailed.match(action)
	) {
		return { ...state, error: action.payload };
	}

	return state;
};
