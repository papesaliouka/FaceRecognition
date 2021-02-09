import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonsubmit}) => {
  return(
  	<div >
  		<div className='center br5 shadow-5 pat pa3' style={{width:'700px'}} >
		  	<input type='tex' className='w-70 pa2' onChange={onInputChange} />
		  	<button className='dib grow w-30 f4 white pat pa2' onClick={onButtonsubmit} >Detect</button>
	  	</div>
  	</div>
  );
}

export default ImageLinkForm;