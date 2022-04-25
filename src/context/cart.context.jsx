import { createContext, useEffect, useState } from 'react';

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
});

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);
	const [open, setOpen] = useState(false);
	const [cartCount, setCartCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		setCartCount(countCartItemQuantity(cartItems));
	}, [cartItems]);

	useEffect(() => {
		setCartTotal(countCartTotalPrice(cartItems));
	}, [cartItems]);

	const addItemsToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};
	const removeItemsFromCart = (productToRemove) => {
		setCartItems(removeCartItem(cartItems, productToRemove));
	};
	const deleteItemFromCart = (productToDelete) => {
		setCartItems(deleteItem(cartItems, productToDelete));
	};
	const value = {
		cartItems,
		addItemsToCart,
		open,
		setOpen,
		cartCount,
		removeItemsFromCart,
		deleteItemFromCart,
		cartTotal,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
