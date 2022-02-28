import React from 'react'

import styled from 'styled-components'

const CustomInputContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
	align-items: center;
`

const CustomInputInput = styled.input`
	border-radius: 25px;
	border: 1px solid rgb(128, 128, 128, 0.5);
	padding: 5px 10px;
	text-align: center;

	&[type='file'] {
		display: none;
	}
`

const CustomInputLabel = styled.label`
	&[type='file'] {
		border-radius: 25px;
		border: 1px solid rgb(128, 128, 128, 0.5);
		padding: 5px 10px;
		display: flex;
		align-items: center;
		justify-content: space-around;
		min-width: 100px;
		cursor: pointer;
	}
`

const CustomInput = ({ value, onChange, type, id, label, ...inputProps }) => {
	return (
		<>
			<CustomInputContainer>
				{label && (
					<CustomInputLabel htmlFor={id} type={type}>
						{label}
					</CustomInputLabel>
				)}
				<CustomInputInput
					id={id}
					value={value}
					onChange={event => onChange(event)}
					type={type}
					{...inputProps}
				/>
			</CustomInputContainer>
		</>
	)
}

export default CustomInput
