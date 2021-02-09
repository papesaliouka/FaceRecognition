import React from 'react';

const Rank = ({name, entries}) => {
  return(
  	<div className="ma4">
	   <div className='f2 ma4 center white'>
	   	{` ${name} your current entry count is ...`}
	   </div>
	    <div className='f3 ma4 white center'>
	   		{entries}
	  	</div>
   </div>
  );
}

export default Rank;