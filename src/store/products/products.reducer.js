import { PRODUCTS_ACTIONS } from './products.type';

const PRODUCTS_INITIAL_STATE = {
	products: [],
	isLoading: false,
	error: null,
};

export const productsReducer = (
	state = PRODUCTS_INITIAL_STATE,
	actions = {}
) => {
	switch (actions.type) {
		case PRODUCTS_ACTIONS.FETCH_PRODUCT_START:
			return { ...state, isLoading: true };
		case PRODUCTS_ACTIONS.FETCH_PRODUCT_SUCCESS:
			return { ...state, products: actions.payload, isLoading: false };
		case PRODUCTS_ACTIONS.FETCH_PRODUCT_FAILED:
			return { ...state, error: actions.payload, isLoading: false };
		default:
			return state;
	}
};
