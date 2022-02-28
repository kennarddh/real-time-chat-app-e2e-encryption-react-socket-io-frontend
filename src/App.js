import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Component
import Layout from 'Components/Layout/Layout'

// Pages
import JoinRoom from 'Pages/JoinRoom/JoinRoom'
import Room from 'Pages/Room/Room'
import Home from 'Pages/Home/Home'

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<Home />} />

						{/* Room */}
						<Route path='room'>
							{/* Room */}
							<Route index element={<Room />} />

							{/* Join */}
							<Route
								path='join'
								element={<JoinRoom />}
							/>
						</Route>
					</Route>
				</Routes>
			</Router>
		</>
	)
}

export default App
