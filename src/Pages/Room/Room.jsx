import React, { useState, useEffect } from 'react'

import { useNavigate, useLocation } from 'react-router-dom'

import styled from 'styled-components'

import io from 'socket.io-client'

import { v4 as uuidv4 } from 'uuid'

// Components
import CustomForm from 'Components/StyledComponents/CustomForm'
import CustomInput from 'Components/StyledComponents/CustomInput'

// Utils
import { Encrypt, Decrypt } from 'Utils/Aes'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 4%;
	height: 90vh;
`

const HistoryContainer = styled.div`
	overflow-y: scroll;
	height: 100%;
	width: 100%;
	display: flex;

	flex-direction: column-reverse;

	&::-webkit-scrollbar {
		width: 10px;
	}

	&::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

	&::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 15px;
	}
`

const HistoryItemContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: ${props => (props.left ? 'flex-start' : 'flex-end')};
`

const HistoryItem = styled.div`
	display: flex;
	justify-content: center;
	gap: 5px;
	align-items: flex-start;
	flex-direction: column;
	border-radius: 20px;
	padding: 10px;
	background-color: ${props => (props.gray ? 'gray' : 'lightgreen')};

	& p {
		margin: 0;
	}
`

const SendMessageContainer = styled(CustomForm)`
	width: 100%;
	padding: 10px 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	box-sizing: border-box;
`

const SendMessageInput = styled(CustomInput)`
	width: 100%;
`

const Header = styled.div`
	height: 5%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	background-color: #23b574;
`

const UsersList = styled.div`
	width: 20%;
`

const UsersListItem = styled.p``

const Center = styled.div`
	height: 80%;
	display: flex;
	flex-direction: row;
`

const Room = () => {
	const [Message, SetMessage] = useState('')
	const [Messages, SetMessages] = useState([])
	const [NowNotification, SetNowNotification] = useState('')
	const [Users, SetUsers] = useState([])

	const [Username, SetUsername] = useState('')
	const [RoomName, SetRoomName] = useState('')

	const [Socket, SetSocket] = useState(null)

	const LocationState = useLocation().state

	const navigate = useNavigate()

	const SendMessage = () => {
		if (!Message) return

		Socket.emit('room:message:send', {
			message: Encrypt(Message),
			id: uuidv4(),
		})

		SetMessages(messages => [
			{ id: uuidv4(), from: Username, message: Message },
			...messages,
		])

		SetMessage('')
	}

	useEffect(() => {
		const { username, roomName } = LocationState

		if (!LocationState) return navigate('/room/join')

		SetUsername(username)
		SetRoomName(roomName)

		const socket = io.connect(process.env.REACT_APP_SOCKETIO_SERVER, {
			query: {
				username,
				roomName,
			},
		})

		SetSocket(socket)

		socket.on('room:message:receive', ({ from, message, id }) => {
			SetMessages(messages => [
				{ from, message: Decrypt(message), id },
				...messages,
			])
		})

		socket.on('room:notification', ({ message }) => {
			SetNowNotification(message)
		})

		socket.on('room:users:receive', ({ users }) => {
			SetUsers(users)
		})

		return () => socket.disconnect()
	}, [LocationState, navigate])

	return (
		<>
			<Container>
				<Header>
					<h2>{RoomName}</h2>
					<p>{NowNotification}</p>
					<h3>Username: {Username}</h3>
				</Header>
				<Center>
					<HistoryContainer>
						{Messages.map(({ from, message, id }) => (
							<HistoryItemContainer
								key={id}
								left={from !== Username}
							>
								<HistoryItem gray={from !== Username}>
									{from !== Username && <p>{from}</p>}
									<p>{message}</p>
								</HistoryItem>
							</HistoryItemContainer>
						))}
					</HistoryContainer>
					<UsersList>
						{Users.map(item => (
							<UsersListItem>{item}</UsersListItem>
						))}
					</UsersList>
				</Center>
				<SendMessageContainer
					noMarginButton
					buttonTitle='Send'
					onSubmit={SendMessage}
				>
					<SendMessageInput
						style={{
							width: '100%',
						}}
						type='text'
						id='message'
						value={Message}
						onChange={event => SetMessage(event.target.value)}
						placeholder='Type your message...'
					/>
				</SendMessageContainer>
			</Container>
		</>
	)
}

export default Room
