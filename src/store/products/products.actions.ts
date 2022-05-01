import {
	createActions,
	Action,
	ActionWithPayload,
	withMatcher,
} from '../../utils/reducer/reducer.utils';
import { PRODUCTS_ACTIONS, Product } from './products.type';

export type FetchProductsStart = Action<PRODUCTS_ACTIONS.FETCH_PRODUCT_START>;

export type FetchProductsSuccess = ActionWithPayload<
	PRODUCTS_ACTIONS.FETCH_PRODUCT_SUCCESS,
	Product[]
>;
export type FetchProductsFailed = ActionWithPayload<
	PRODUCTS_ACTIONS.FETCH_PRODUCT_FAILED,
	Error
>;

export const fetchProductsStart = withMatcher(
	(): FetchProductsStart => createActions(PRODUCTS_ACTIONS.FETCH_PRODUCT_START)
);

export const fetchProductsSuccess = withMatcher(
	(productsArray: Product[]): FetchProductsSuccess =>
		createActions(PRODUCTS_ACTIONS.FETCH_PRODUCT_SUCCESS, productsArray)
);

export const fetchProductsFailed = withMatcher(
	(error: Error): FetchProductsFailed =>
		createActions(PRODUCTS_ACTIONS.FETCH_PRODUCT_FAILED, error)
);
