import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';



function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className="navigation-bar">

			<div className='navigation-div'>
				<h1><NavLink exact to="/"><img className="LOGO" src="http://audiodome-songs.s3.amazonaws.com/03ba22abe56942c39dfb757804c7ad3a.png" /></NavLink></h1>
			</div>

			{isLoaded && sessionUser && (

				<div className='navigation-div'>
					<ProfileButton user={sessionUser} />
				</div>

			)}

		</div>
	);
}

export default Navigation;
