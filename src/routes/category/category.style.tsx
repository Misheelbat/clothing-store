import styled from 'styled-components';

export const CategoryTitle = styled.h1`
	font-size: 28px;
	margin-bottom: 25px;
	text-align: center;
`;
export const CategoryProducts = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 20px;
	row-gap: 50px;
`;
