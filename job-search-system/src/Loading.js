import React from "react";
import LoadingGif from "./Images/Loading2Blue.gif";

const Loading = () => {
	return (
		<div className='modal-container'>
			<div className='overlay-style' />
			<div className='loading-container'>
				<h3>Processing Request... Please wait...</h3>
				<img src={LoadingGif} alt='Loading state' />
			</div>
		</div>
	);
};

export default Loading;
