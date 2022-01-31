import React, { useState } from "react";
import AdminResources from "../AdminResources";
import CloseIcon from "../Images/CloseIcon.png";
import LocationIcon from "../Images/LocationIcon.png";

const AccountJobPosts = ({ jobPosts, jobApplicants, adminPosts }) => {
	const [post, setPost] = useState([]);
	const [isPostPreview, setIsPostPreview] = useState(false);

	let filteredJobApplicants = [];

	const sortedJobPosts = jobPosts.sort((a, b) => {
		return a.Date_Posted < b.Date_Posted ? 1 : -1;
	});

	let finalSalary = "";
	try {
		if (post) {
			let jobSalary = post.Salary;
			for (let a = 1; a <= jobSalary.length; a++) {
				if (
					jobSalary.length - a === 3 ||
					jobSalary.length - a === 6 ||
					jobSalary.length - a === 9 ||
					jobSalary.length - a === 12 ||
					jobSalary.length - a === 15 ||
					jobSalary.length - a === 18 ||
					jobSalary.length - a === 21
				) {
					finalSalary += jobSalary[a - 1] + ",";
				} else {
					finalSalary += jobSalary[a - 1];
				}
			}

			filteredJobApplicants = jobApplicants.filter(
				(jobApplicant) => jobApplicant.CompanyID === post.CompanyID
			);
		}
	} catch (error) {}

	let count = 0;

	return (
		<div className='post-preview-panel'>
			<div className='job-post-header'>
				<h3>{isPostPreview ? "Job Post Preview" : "Job Posts"}</h3>
				{isPostPreview ? <p title='More Options...'>•••</p> : ""}
			</div>
			<div className='job-posts'>
				{isPostPreview ? (
					<>
						{post !== null ? (
							<div>
								<div className='post-header'>
									<div className='upperLeft-info'>
										<div className='account-profile'>
											<img
												src={`../assets/${post.Company_Image}`}
												alt='Stablishment'
											/>
										</div>
										<div className='basic-info'>
											<h2>{post.Company_Name}</h2>

											<div className='date-address'>
												<p>
													{AdminResources.setTimeStamp(
														post.Minutes,
														post.Hour,
														post.Day,
														post.Month,
														post.Year
													)}
												</p>
												<div className='address'>
													<img
														src={LocationIcon}
														alt='Location Icon'
													/>
													<p>{post.Company_Address}</p>
												</div>
											</div>
										</div>
									</div>
									<div className='upperRight-info'>
										<img
											src={CloseIcon}
											alt='Close Panel'
											title='Close Preview'
											style={{ height: "25px" }}
											onClick={() => setIsPostPreview(false)}
										/>
									</div>
								</div>
								<div className='post-preview'>
									<div className='post-body'>
										<div className='post-basic-content'>
											<h3 className='job-title'>{post.Job_Title}</h3>
											<p className='job-category'>
												({post.Category})
											</p>

											<div className='post-detail-container'>
												<div className='post-detail-group1'>
													<div className='post-detail'>
														<p>Salary:</p>
														<h4>₱ {finalSalary}</h4>
													</div>
													<div className='post-detail'>
														<p>Req. Employees:</p>
														<h4>{post.Required_Employees}</h4>
													</div>
													<div className='post-detail'>
														<p>Applied Applicants:</p>
														<h4>
															{filteredJobApplicants.length}
														</h4>
													</div>
												</div>

												<div className='post-detail-group2'>
													<div className='post-detail'>
														<p>Job Type:</p>
														<h4>{post.Job_Type}</h4>
													</div>
													<div className='post-detail'>
														<p>Pref. Sex:</p>
														<h4>{post.Preferred_Sex}</h4>
													</div>
													<div className='post-detail'>
														<p>Job Status:</p>
														<div className='active-status'>
															<div
																className='active-circle'
																style={
																	post.Active_Status ===
																	"Active"
																		? {
																				backgroundColor:
																					"#00ff40",
																		  }
																		: {
																				backgroundColor:
																					"red",
																		  }
																}></div>
															<h4>{post.Active_Status}</h4>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='job-qualification-container'>
											<div className='job-qualification-portion'>
												<h3>--- Job Qualifications ---</h3>
												<p>{post.Job_Qualifications}</p>
											</div>
											<div className='job-qualification-portion'>
												<h3>--- Job Requirements ---</h3>
												<p>{post.Job_Requirements}</p>
											</div>
											<div className='job-qualification-portion'>
												<h3>--- Job Description ---</h3>
												<p>{post.Job_Description}</p>
											</div>
											<div className='job-qualification-portion'>
												<h3>--- Employer's Name ---</h3>
												<p>{post.Employer_Name}</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						) : (
							<p
								style={{
									textAlign: "center",
									padding: "10px",
									backgroundColor: "red",
									color: "white",
									fontWeight: "500",
									fontSize: "14px",
								}}>
								No Job Post Selected!
							</p>
						)}
					</>
				) : (
					<div>
						{sortedJobPosts.map((jobPost) => {
							let isAdminPost = false;

							for (let a = 0; a < adminPosts.length; a++) {
								if (
									adminPosts[a].CompanyID === jobPost.CompanyID &&
									adminPosts[a].JobID === jobPost.JobID &&
									adminPosts[a].AdminID ===
										sessionStorage.getItem("UserID")
								) {
									isAdminPost = true;
								}
							}

							if (isAdminPost === true) {
								count += 1;
								return (
									<div
										className='job-post'
										onClick={() => {
											setIsPostPreview(true);
											setPost(jobPost);
										}}>
										<div className='post-right-text'>
											<h2>{jobPost.Job_Title}</h2>
											<h5>{jobPost.Company_Name}</h5>
										</div>
										<div className='post-left-text'>
											<p>
												{AdminResources.setTimeStamp(
													jobPost.Minutes,
													jobPost.Hour,
													jobPost.Day,
													jobPost.Month,
													jobPost.Year
												)}
											</p>
											<h3>{jobPost.Company_Address}</h3>
										</div>
									</div>
								);
							}
						})}
					</div>
				)}
				{count === 0 && isPostPreview === false && (
					<p
						style={{
							textAlign: "center",
							padding: "10px",
							backgroundColor: "red",
							color: "white",
							fontWeight: "500",
							fontSize: "14px",
						}}>
						No Job Posts Yet!
					</p>
				)}
			</div>
		</div>
	);
};

export default AccountJobPosts;
