import { CART_ACTIONS } from './cart.types';

const CART_INITIAL_STATE = {
	cartItems: [],
	open: false,
};

export const cartReducer = (state = CART_INITIAL_STATE, actions = {}) => {
	switch (actions.type) {
		case CART_ACTIONS.SET_CART_ITEMS:
			return { ...state, cartItems: actions.payload };
		case CART_ACTIONS.TOGGLE_CART:
			return { ...state, open: actions.payload };
		default:
			return state;
	}
};
