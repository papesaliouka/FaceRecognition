import React from 'react';
import Tilt from 'react-tilt';
import PSK from './PSK.jpg';

const Logo = () => {
  return(
  	<div>
		  <Tilt className="Tilt ma4" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
		 		<div 
		 		className="Tilt-inner pa3 br3 shadow-5"
		 		style={{background: 'linear-gradient(90deg, rgba(45,40,40,1) 12%, rgba(63,200,203,1) 47%, rgba(21,115,101,1) 87%)'}}>
		 			 <img src={PSK} alt='' style={{width:'500px', height: 'auto'}}/> 
		 		 </div>
			</Tilt>
  	</div>
    
  );
}

export default Logo;