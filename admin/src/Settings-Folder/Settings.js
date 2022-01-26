import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import About from "./About";
import Account from "./Account";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions";

const Settings = ({
	activePage,
	setActivePage,
	setJobPosts,
	setEmployers,
	setApplicantsData,
	setJobApplicants,
	setJobSeekers,
	setCompaniesData,
	admin,
	adminPosts,
	setAdmin,
	jobPosts,
	jobApplicants,
	setAdminPosts,
}) => {
	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const [activeLink, handleChangeLink] = useState("Account");

	const [activeAccountPanel, setActiveAccountPanel] = useState("Job Posts");

	const navigate = useNavigate();

	useEffect(() => {
		setActivePage("Settings");
		localStorage.setItem("activePage", "Settings");

		const sessionUser = sessionStorage.getItem("UserID");
		if (!sessionUser) {
			navigate("/");
		}
	}, []);

	return (
		<div className='settings-container'>
			<div className='content-wrapper'>
				{isSidebarOpen ? (
					<div className='sidebar-container'>
						<Sidebar
							activePage={activePage}
							setActivePage={setActivePage}
							setJobPosts={setJobPosts}
							setEmployers={setEmployers}
							setApplicantsData={setApplicantsData}
							setCompaniesData={setCompaniesData}
							setJobApplicants={setJobApplicants}
							setJobSeekers={setJobSeekers}
							setAdminPosts={setAdminPosts}
							setSidebarOpen={setSidebarOpen}
						/>
					</div>
				) : (
					""
				)}
				<div className='panel-container'>
					<Navbar
						isSidebarOpen={isSidebarOpen}
						activePage={activePage}
						admin={admin}
						setAdmin={setAdmin}
						setSidebarOpen={setSidebarOpen}
						handleChangeLink={handleChangeLink}
					/>

					<div
						className='main-panel-container'
						style={
							activeLink !== "Account"
								? { height: "85vh", overflowY: "scroll" }
								: {}
						}>
						<div className='menu-container'>
							{activeLink === "About" ? (
								<About />
							) : activeLink === "Terms" ? (
								<TermsAndConditions />
							) : activeLink === "Privacy" ? (
								<PrivacyPolicy />
							) : (
								<Account
									activeAccountPanel={activeAccountPanel}
									setActiveAccountPanel={setActiveAccountPanel}
									jobPosts={jobPosts}
									adminPosts={adminPosts}
									jobApplicants={jobApplicants}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
