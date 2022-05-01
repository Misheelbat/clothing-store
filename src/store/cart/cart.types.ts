import { ProductItem } from '../products/products.type';
export enum CART_ACTIONS {
	SET_CART_ITEMS = 'SET_CART_ITEMS',
	TOGGLE_CART = 'TOGGLE_CART',
}

export type CartItem = ProductItem & {
	quantity: number;
};
