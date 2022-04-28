import { createActions } from '../../utils/reducer/reducer.utils';
import { CART_ACTIONS } from './cart.types';

// helper functions
const addCartItem = (cartItems, productToAdd) => {
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

const removeCartItem = (cartItems, productToInc) => {
	if (productToInc.quantity === 1) {
		return cartItems.filter((items) => items.id !== productToInc.id);
	}

	const newItem = { ...productToInc, quantity: productToInc.quantity - 1 };
	const updatedItems = cartItems.map((item) =>
		item.id === productToInc.id ? newItem : item
	);

	return updatedItems;
};

const deleteItem = (cartItems, productToDelete) => {
	const cartItemExists = cartItems.find(
		(item) => item.id === productToDelete.id
	);

	if (!cartItemExists) return;

	return cartItems.filter((items) => items.id !== productToDelete.id);
};

// action creaters
export const addItemsToCart = (cartItems, productToAdd) => {
	const newItems = addCartItem(cartItems, productToAdd);
	return createActions(CART_ACTIONS.SET_CART_ITEMS, newItems);
};

export const removeItemsFromCart = (cartItems, productToRemove) => {
	const newItems = removeCartItem(cartItems, productToRemove);
	return createActions(CART_ACTIONS.SET_CART_ITEMS, newItems);
};

export const deleteItemFromCart = (cartItems, productToDelete) => {
	const newItems = deleteItem(cartItems, productToDelete);
	return createActions(CART_ACTIONS.SET_CART_ITEMS, newItems);
};

export const setOpen = (bool) => createActions(CART_ACTIONS.TOGGLE_CART, bool);
