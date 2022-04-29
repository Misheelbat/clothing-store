import { USER_ACTIONS } from './user.types';

const INITIAL_STATE = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userReducer = (state = INITIAL_STATE, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTIONS.SIGNIN_SUCCESS:
			return {
				...state,
				currentUser: payload,
			};
		case USER_ACTIONS.SIGNOUT_SUCCESS:
			return { ...state, currentUser: null };
		case USER_ACTIONS.SIGNOUT_FAILURE:
		case USER_ACTIONS.SIGNUP_FAILURE:
		case USER_ACTIONS.SIGNIN_FAILURE:
			return { ...state, error: payload };
		default:
			return state;
	}
};
