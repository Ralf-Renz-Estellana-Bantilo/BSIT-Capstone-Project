import React from "react";
import LoadingBlueGif from "./Images/Loading2Blue.gif";

const Loading = ({ message }) => {
	return (
		<div className='modal-container'>
			<div className='overlay-style' />
			<div className='loading-container'>
				<h3>{message}</h3>
				<img src={LoadingBlueGif} alt='Loading state' />
			</div>
		</div>
	);
};

Loading.defaultProps = {
	message: "Processing Request... Please wait...",
};

export default Loading;
