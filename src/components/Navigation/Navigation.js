import React from 'react';
import './Navigation.css';

const Navigation = ({onPlaceChange, isSignIn}) => {
	return isSignIn 
		? 
			
				<nav className='ma4'>
					<p onClick={() => onPlaceChange('signin')} className='link dim black f3 nav'>Sign Out</p>
				</nav>
		
		: (
				<nav  style={{display:'flex', justifyContent: 'flex-end'}} >
					<p  onClick={() => onPlaceChange('signin')} className='link pointer dim black f3 mr4 nav'>Sign In</p>
					<p  onClick={() => onPlaceChange('register')} className='link pointer dim black f3 mr4 nav'>Register</p>
				</nav>
			);  
} 


export default Navigation;