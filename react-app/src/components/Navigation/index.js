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
			<ul>
				<li>
					<div className='navigation-div'>
						<h1><NavLink exact to="/">< GrHomeRounded /></NavLink></h1>
						<p>Home</p>
					</div>
				</li>
				{isLoaded && (
					<li>
						<div className='navigation-div'>
							<ProfileButton user={sessionUser} />
							<p>User</p>
						</div>
					</li>
				)}
			</ul>
		</div>
	);
}

export default Navigation;
