import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsCartOpen } from '../../store/cart/cart.selectors';
import { Outlet } from 'react-router-dom';
import { signOutStart } from '../../store/user/user.action';
import CartDropdown from '../../components/cart-dropdown/CartDropdown';
import CartIcon from '../../components/cart-icon/CartIcon';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { RootState } from '../../store/store';
import {
	NavigationContainer,
	LogoContainer,
	NavLinks,
	NavLink,
} from './navigation.style';
const Navigation = () => {
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state: RootState) => state.user);
	const open = useSelector(selectIsCartOpen);

	const signOutHandler = async () => {
		dispatch(signOutStart());
	};
	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to="/">
					<Logo className="logo" />
				</LogoContainer>
				<NavLinks>
					<NavLink to="/shop">SHOP</NavLink>
					{currentUser ? (
						<NavLink as="span" onClick={signOutHandler}>
							SIGN OUT
						</NavLink>
					) : (
						<NavLink to="/auth">SIGN IN</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				{open && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
