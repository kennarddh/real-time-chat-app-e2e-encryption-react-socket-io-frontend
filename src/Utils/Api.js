import axios from 'axios'

const api = axios.create({
	baseURL: `${process.env.REACT_APP_SERVER}/api`,
})

export const GetAllRooms = () => api.get(`/rooms`)
