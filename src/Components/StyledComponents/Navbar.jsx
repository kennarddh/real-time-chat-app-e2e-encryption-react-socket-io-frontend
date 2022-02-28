import React from 'react'

import { Link } from 'react-router-dom'

import styled from 'styled-components'

const NavbarWrapper = styled.nav`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	right: 0;
	left: -20px;
	padding: 20px 20px;
	width: 100%;
	background-color: #23b574;
	z-index: 9999;
`

const NavbarItem = styled(Link)`
	text-decoration: none;
	color: black;
	position: relative;
	display: inline-block;
	margin: 0 10px;

	&:after {
		background: none repeat scroll 0 0 transparent;
		bottom: -5px;
		content: '';
		display: block;
		height: 2px;
		left: 50%;
		position: absolute;
		background: #fff;
		transition: width 0.3s ease 0s, left 0.3s ease 0s;
		width: 0;
	}

	&:hover:after {
		width: calc(100% + 20px);
		left: -10px;
	}
`

const Navbar = () => {
	return (
		<>
			<NavbarWrapper>
				<NavbarItem to='/room/join'>Join Room</NavbarItem>
			</NavbarWrapper>
		</>
	)
}

export default Navbar
