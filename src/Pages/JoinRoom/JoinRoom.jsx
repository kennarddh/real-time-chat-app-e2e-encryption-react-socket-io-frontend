import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import styled, { css } from 'styled-components'

// Components
import Title from 'Components/StyledComponents/Title'
import CustomForm from 'Components/StyledComponents/CustomForm'
import CustomInput from 'Components/StyledComponents/CustomInput'

// Utils
import { GetAllRooms } from 'Utils/Api'

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 20px;
`

const TableBorder = css`
	border-collapse: collapse;
	border: 1px solid black;
`

const TablePadding = css`
	padding: 10px;
`

const Rooms = styled.table`
	${TableBorder}
`

const RoomsThead = styled.thead`
	${TableBorder}
`

const RoomsTh = styled.th`
	${TableBorder}
	${TablePadding}
`

const RoomsTr = styled.tr`
	${TableBorder}
`

const RoomsBody = styled.tbody`
	${TableBorder}
`

const RoomsItem = styled.tr`
	${TableBorder}
`

const RoomsItemTd = styled.td`
	${TableBorder}
	${TablePadding}
`

const RoomsItemButton = styled.button`
	${TablePadding}
	border:none;
	border-radius: 15px;
`

const JoinRoom = () => {
	const [Username, SetUsername] = useState('')
	const [RoomName, SetRoomName] = useState('')

	const [RoomsList, SetRoomsList] = useState([])

	const navigate = useNavigate()

	useEffect(() => {
		const AsyncGetAllRooms = async () => {
			await GetAllRooms()
				.then(response => response.data)
				.then(data => data.data)
				.then(rooms => {
					SetRoomsList(rooms)
				})
		}

		AsyncGetAllRooms()
	}, [])

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
				<Rooms>
					<RoomsThead>
						<RoomsTr>
							<RoomsTh>Name</RoomsTh>
							<RoomsTh>Join</RoomsTh>
						</RoomsTr>
					</RoomsThead>
					<RoomsBody>
						{RoomsList.map(room => (
							<RoomsItem key={room}>
								<RoomsItemTd>room</RoomsItemTd>
								<RoomsItemTd>
									<RoomsItemButton>Join</RoomsItemButton>
								</RoomsItemTd>
							</RoomsItem>
						))}
					</RoomsBody>
				</Rooms>
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
