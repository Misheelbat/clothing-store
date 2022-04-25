import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
	// find if cartItems contains productToAdd
	const cartItemExists = cartItems.find((item) => item.id === productToAdd.id);

	// if found, increment quantity
	if (cartItemExists) {
		return cartItems.map((item) =>
			item.id === productToAdd.id
				? { ...item, quantity: item.quantity + 1 }
				: item
		);
	}
	// if not return new array
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};
const countCartItemQuantity = (cartItems) => {
	const quantity = cartItems.reduce((acc, items) => acc + items.quantity, 0);
	return quantity;
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

	useEffect(() => {
		setCartCount(countCartItemQuantity(cartItems));
	}, [cartItems]);

	const addItemsToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const value = {
		cartItems,
		addItemsToCart,
		open,
		setOpen,
		cartCount,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
