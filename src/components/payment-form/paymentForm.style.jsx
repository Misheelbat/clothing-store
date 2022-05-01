import styled from 'styled-components';
import Button from '../button/Button';
export const PaymentFormContainer = styled.div`
	height: 300px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const FormContainer = styled.form`
	height: 100px;
	min-width: 500px;
`;
export const PayButton = styled(Button)`
	margin-top: 30px;
	margin-left: auto;
`;
