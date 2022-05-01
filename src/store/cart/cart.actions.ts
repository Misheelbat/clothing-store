import {
	createActions,
	ActionWithPayload,
	withMatcher,
} from '../../utils/reducer/reducer.utils';
import { CART_ACTIONS, CartItem } from './cart.types';
import { ProductItem } from '../products/products.type';

// helper functions
const addCartItem = (
	cartItems: CartItem[],
	productToAdd: ProductItem
): CartItem[] => {
	const cartItemExists = cartItems.find((item) => item.id === productToAdd.id);

	if (cartItemExists) {
		return cartItems.map((item) =>
			item.id === productToAdd.id
				? { ...item, quantity: item.quantity + 1 }
				: item
		);
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
	cartItems: CartItem[],
	productToInc: CartItem
): CartItem[] => {
	if (productToInc && productToInc.quantity === 1) {
		return cartItems.filter((items) => items.id !== productToInc.id);
	}

	const newItem = { ...productToInc, quantity: productToInc.quantity - 1 };
	const updatedItems = cartItems.map((item) =>
		item.id === productToInc.id ? newItem : item
	);

	return updatedItems;
};

const deleteItem = (
	cartItems: CartItem[],
	productToDelete: CartItem
): CartItem[] => {
	return cartItems.filter((items) => items.id !== productToDelete.id);
};

export type SetOpen = ActionWithPayload<CART_ACTIONS.TOGGLE_CART, boolean>;

export type SetCartItems = ActionWithPayload<
	CART_ACTIONS.SET_CART_ITEMS,
	CartItem[]
>;

// action creaters
export const setOpen = withMatcher(
	(bool: boolean): SetOpen => createActions(CART_ACTIONS.TOGGLE_CART, bool)
);
export const setCartItems = withMatcher(
	(cartItems: CartItem[]): SetCartItems =>
		createActions(CART_ACTIONS.SET_CART_ITEMS, cartItems)
);

export const addItemsToCart = (
	cartItems: CartItem[],
	productToAdd: ProductItem
) => {
	const newItems = addCartItem(cartItems, productToAdd);
	return setCartItems(newItems);
};

export const removeItemsFromCart = (
	cartItems: CartItem[],
	productToRemove: CartItem
) => {
	const newItems = removeCartItem(cartItems, productToRemove);
	return setCartItems(newItems);
};

export const deleteItemFromCart = (
	cartItems: CartItem[],
	productToDelete: CartItem
) => {
	const newItems = deleteItem(cartItems, productToDelete);
	return setCartItems(newItems);
};
