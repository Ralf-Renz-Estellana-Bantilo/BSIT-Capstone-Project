import React, { useState } from "react";

const StarRating = ({ rating }) => {
	return (
		<div className='star-rating'>
			{[...Array(5)].map((star, index) => {
				index += 1;
				if (index <= rating) {
					return (
						<span style={{ color: "black", fontSize: "18px" }}>
							&#9733;
						</span>
					);
				} else {
					return (
						<span style={{ color: "#949494", fontSize: "18px" }}>
							&#9733;
						</span>
					);
				}
			})}
		</div>
	);
};

export default StarRating;
