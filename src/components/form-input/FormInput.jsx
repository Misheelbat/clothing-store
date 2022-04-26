import React from 'react';

import { Group, Input, FormInputLabel } from './formInput.style';

export default function FormInput({ label, ...otherProps }) {
	return (
		<Group>
			<Input {...otherProps} />
			{label && (
				<FormInputLabel shrink={otherProps.value.length}>
					{label}
				</FormInputLabel>
			)}
		</Group>
	);
}
