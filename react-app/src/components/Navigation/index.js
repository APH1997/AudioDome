import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { GrHomeRounded } from "react-icons/gr"


function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className="navigation-bar">

			<div className='navigation-div'>
				<h1><NavLink exact to="/">< GrHomeRounded /><p>Home</p></NavLink></h1>
			</div>

			{isLoaded && (

				<div className='navigation-div'>
					<ProfileButton user={sessionUser} />
					<p>User</p>
				</div>

			)}

		</div>
	);
}

export default Navigation;
