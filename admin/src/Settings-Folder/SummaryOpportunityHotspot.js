import React from "react";

const SummaryOpportunityHotspot = () => {
	return (
		<div className='summary-container'>
			<div className='summary'>
				<div className='summary-header'>
					<h4>JOB POSTS PER MONTH</h4>
				</div>
				<div className='summary-content'>
					<table>
						<tr>
							<th style={{ padding: "0 70px" }}>Month</th>
							<th>No. of Posts</th>
						</tr>
						{/* {postsPerMonth} */}
						<tr>
							<td className='summary-total'>TOTAL</td>
							<td className='summary-value'>totalPostsPerMonth</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	);
};

export default SummaryOpportunityHotspot;
