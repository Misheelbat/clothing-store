import { createActions } from '../../utils/reducer/reducer.utils';
import { PRODUCTS_ACTIONS } from './products.type';

export const fetchProductsStart = () =>
	createActions(PRODUCTS_ACTIONS.FETCH_PRODUCT_START);

export const fetchProductsSuccess = (productsArray) =>
	createActions(PRODUCTS_ACTIONS.FETCH_PRODUCT_SUCCESS, productsArray);

export const fetchProductsFailed = (error) =>
	createActions(PRODUCTS_ACTIONS.FETCH_PRODUCT_FAILED, error);

