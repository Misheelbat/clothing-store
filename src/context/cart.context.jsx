import { createContext, useReducer } from 'react';
import { createActions } from '../utils/reducer/reducer.utils';

const countCartItemQuantity = (cartItems) => {
	const quantity = cartItems.reduce((acc, items) => acc + items.quantity, 0);
	return quantity;
};

const countCartTotalPrice = (cartItems) => {
	const totalPrice = cartItems.reduce(
		(acc, items) => acc + items.quantity * items.price,
		0
	);
	return totalPrice;
};

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

export const CartContext = createContext({
	cartItems: [],
	addItemsToCart: () => {},
	open: false,
	setOpen: () => {},
	cartCount: 0,
	cartTotal: 0,
});

export const CART_ACTIONS = {
	SET_CART_ITEMS: 'SET_CART_ITEMS',
	TOGGLE_CART: 'TOGGLE_CART',
};

const cartReducer = (state, actions) => {
	switch (actions.type) {
		case CART_ACTIONS.SET_CART_ITEMS:
			return { ...state, ...actions.payload };
		case CART_ACTIONS.TOGGLE_CART:
			return { ...state, open: actions.payload };
		default:
			throw new Error(`Unhandled type in ${actions.type} in useReducer`);
	}
};

const INITIAL_STATE = {
	cartItems: [],
	open: false,
	cartCount: 0,
	cartTotal: 0,
};
export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
	const { cartItems, open, cartCount, cartTotal } = state;

	const updateCartItemsReducer = (newItems) => {
		const newCount = countCartItemQuantity(newItems);
		const newTotal = countCartTotalPrice(newItems);

		dispatch(
			createActions(CART_ACTIONS.SET_CART_ITEMS, {
				cartItems: newItems,
				cartCount: newCount,
				cartTotal: newTotal,
			})
		);
	};

	const addItemsToCart = (productToAdd) => {
		const newItems = addCartItem(cartItems, productToAdd);
		updateCartItemsReducer(newItems);
	};

	const removeItemsFromCart = (productToRemove) => {
		const newItems = removeCartItem(cartItems, productToRemove);
		updateCartItemsReducer(newItems);
	};

	const deleteItemFromCart = (productToDelete) => {
		const newItems = deleteItem(cartItems, productToDelete);
		updateCartItemsReducer(newItems);
	};

	const setOpen = (bool) => {
		dispatch(createActions(CART_ACTIONS.TOGGLE_CART, bool));
	};

	const value = {
		cartItems,
		addItemsToCart,
		removeItemsFromCart,
		deleteItemFromCart,
		open,
		setOpen,
		cartCount,
		cartTotal,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
