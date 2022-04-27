import { createActions } from '../../utils/reducer/reducer.utils';
import { USER_ACTIONS } from './user.types';
export const setCurrentUser = (user) =>
	createActions(USER_ACTIONS.SET_CURRENT_USER, user);
