import { createContext, useState } from 'react';

export const CartContext = createContext({
	cartItems: [],
	setCartItems: () => {},
	open: false,
	setOpen: () => {},
});

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);
	const [open, setOpen] = useState(false);
	const value = {
		cartItems,
		setCartItems,
		open,
		setOpen,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
