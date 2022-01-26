import React, { useState } from "react";
import LocationIcon from "../Images/LocationIcon.png";
import User from "../Images/User.png";
import CloseIcon from "../Images/CloseIcon.png";
import "./AccountCompanies.css";

const AccountCompanies = ({ companies, adminPosts }) => {
	const [isCompanyPreview, setCompanyPreview] = useState(false);
	const [companyData, setCompanyData] = useState([]);
	const [companyInfo, setCompanyInfo] = useState(null);

	return (
		<div className='post-preview-panel'>
			<div className='job-post-header'>
				<h3>
					{isCompanyPreview ? "Company Account Credentials" : "Companies"}
				</h3>
				{isCompanyPreview ? <p title='More Options...'>•••</p> : ""}
			</div>

			<div className='job-posts'>
				{isCompanyPreview ? (
					<div className='company-credentials-container'>
						<div
							className='close-company-credentials'
							onClick={() => setCompanyPreview(false)}>
							<img src={CloseIcon} alt='Close' title='Close' />
						</div>
						<div className='company-credentials-img'>
							<img
								src={`../assets/${companyInfo.Company_Image}`}
								alt='Company'
							/>
						</div>
						<div className='company-credentials-details'>
							<h3>{companyInfo.Company_Name}</h3>
							<div className='company-credentials-location'>
								<img src={LocationIcon} alt='Location' />
								<p>{`${companyInfo.Street},
												${companyInfo.Zone},
												${companyInfo.Barangay}`}</p>
							</div>
						</div>
						<div className='generated-fields'>
							<p>Generated Username:</p>
							<input type='text' value={companyData.Username} />
						</div>
						<div className='generated-fields'>
							<p>Generated Password:</p>
							<input type='text' value={companyData.Password} />
						</div>
						<p className='note'>
							Go to the main website and use this login credentials to
							manage it!
						</p>
					</div>
				) : (
					<>
						{companies.map((company) => {
							let isAdminPost = false;
							let companyCredentials = [];

							for (let a = 0; a < adminPosts.length; a++) {
								if (adminPosts[a].CompanyID === company.CompanyID) {
									isAdminPost = true;
									companyCredentials = adminPosts[a];
								}
							}

							if (isAdminPost === true) {
								return (
									<div
										className='job-post'
										style={{ border: "none" }}
										onClick={() => {
											setCompanyPreview(true);
											setCompanyData(companyCredentials);
											setCompanyInfo(company);
										}}>
										<div className='upperLeft-info'>
											<div
												className='account-profile'
												style={{
													height: "50px",
													width: "50px",
												}}>
												<img
													src={`../assets/${company.Company_Image}`}
													alt='Company'
												/>
											</div>
											<div className='basic-info'>
												<h2>{company.Company_Name}</h2>

												<div className='date-address'>
													<div className='address'>
														<img
															src={LocationIcon}
															alt='Location Icon'
														/>
														<p>
															{`${company.Street},
												${company.Zone},
												${company.Barangay}`}
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								);
							}
						})}
					</>
				)}
			</div>
		</div>
	);
};

export default AccountCompanies;
