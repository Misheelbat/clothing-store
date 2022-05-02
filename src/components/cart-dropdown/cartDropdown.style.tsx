import styled from 'styled-components';

export const CartDropdownContainer = styled.div`
	box-sizing: content-box;
	position: absolute;
	width: 240px;
	height: 340px;
	display: flex;
	flex-direction: column;
	padding: 20px;
	border: 1px solid black;
	background-color: white;
	top: 90px;
	right: 40px;
	z-index: 5;
	button {
		margin-top: auto;
	}
`;

export const EmptyContainer = styled.span`
	font-size: 18px;
	margin: 50px auto;
`;

export const CartDropdownItems = styled.div`
	height: 240px;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
`;
