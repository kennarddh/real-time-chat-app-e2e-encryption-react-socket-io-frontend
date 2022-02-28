import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

// Components
import Title from 'Components/StyledComponents/Title'
import CustomForm from 'Components/StyledComponents/CustomForm'
import CustomInput from 'Components/StyledComponents/CustomInput'

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

const JoinRoom = () => {
	const [Username, SetUsername] = useState('')
	const [RoomName, SetRoomName] = useState('')

	const navigate = useNavigate()

	const OnSubmit = () => {
		if (!Username || !RoomName) return

		navigate('/room', {
			state: {
				username: Username,
				roomName: RoomName,
			},
		})
	}

	return (
		<>
			<Title title='Join Room' />
			<Container>
				<CustomForm buttonTitle='Join' onSubmit={OnSubmit}>
					<CustomInput
						value={Username}
						onChange={event => SetUsername(event.target.value)}
						type='text'
						id='username'
						label='Username'
						placeholder='Username'
					/>
					<CustomInput
						value={RoomName}
						onChange={event => SetRoomName(event.target.value)}
						type='text'
						id='roomName'
						label='Room Name'
						placeholder='Room Name'
					/>
				</CustomForm>
			</Container>
		</>
	)
}

export default JoinRoom
