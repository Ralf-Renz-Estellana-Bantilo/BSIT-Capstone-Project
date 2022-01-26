import React from "react";

const AccountJobApplicants = () => {
	return (
		<div className='post-preview-panel'>
			<div className='job-post-header'>
				<h3>Job Applicants</h3>
			</div>
			{/* <div className='job-post'>
				<div className='post-right-text'>
					<h2>jobPost.Job_Title</h2>
					<h5>jobPost.Company_Name</h5>
				</div>
				<div className='post-left-text'>
					<p>
						5mins ago
					</p>
					<h3>jobPost.Company_Address</h3>
				</div>
			</div> */}
			<p
				style={{
					fontSize: "15px",
					padding: "0 10px",
					textAlign: "justify",
					fontWeight: "500",
				}}>
				To manage job applicants, you have to login to the main website with
				the login credentials that are provided on the 'Your Companies'
				panel. You can send the login credentials to those users that
				requested those job posts (if there's any).
			</p>
		</div>
	);
};

export default AccountJobApplicants;
