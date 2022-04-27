import { PRODUCTS_ACTIONS } from './products.type';
const PRODUCTS_INITIAL_STATE = {
	products: {},
};

export const productsReducer = (
	state = PRODUCTS_INITIAL_STATE,
	actions = {}
) => {
	switch (actions.type) {
		case PRODUCTS_ACTIONS.SET_PRODUCTS:
			return { ...state, products: actions.payload };
		default:
			return state;
	}
};
