import React from "react";
import LoadingBlueGif from "./Images/Loading2Blue.gif";
import LoadingRedGif from "./Images/Loading2Red.gif";

const Loading = ({ role, message }) => {
	return (
		<div className='modal-container'>
			<div className='overlay-style' />
			<div className='loading-container'>
				<h3>{message}</h3>
				<img
					src={role === "Job Seeker" ? LoadingBlueGif : LoadingRedGif}
					alt='Loading state'
				/>
			</div>
		</div>
	);
};

Loading.defaultProps = {
	role: "Job Seeker",
	message: "Processing Request... Please wait...",
};

export default Loading;
