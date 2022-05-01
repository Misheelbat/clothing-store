import { AnyAction } from 'redux';
import { Product } from './products.type';
import {
	fetchProductsStart,
	fetchProductsFailed,
	fetchProductsSuccess,
} from './products.actions';

export type ProductsState = {
	readonly products: Product[];
	readonly isLoading: boolean;
	readonly error: Error | null;
};
const PRODUCTS_INITIAL_STATE: ProductsState = {
	products: [],
	isLoading: false,
	error: null,
};

export const productsReducer = (
	state = PRODUCTS_INITIAL_STATE,
	actions: AnyAction
): ProductsState => {
	if (fetchProductsStart.match(actions)) {
		return { ...state, isLoading: true };
	}

	if (fetchProductsSuccess.match(actions)) {
		return { ...state, products: actions.payload, isLoading: false };
	}

	if (fetchProductsFailed.match(actions)) {
		return { ...state, error: actions.payload, isLoading: false };
	}

	return state;
};
