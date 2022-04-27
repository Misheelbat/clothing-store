import { createActions } from '../../utils/reducer/reducer.utils';
import { PRODUCTS_ACTIONS } from './products.type';

export const setProducts = (products) =>
	createActions(PRODUCTS_ACTIONS.SET_PRODUCTS, products);
