import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

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
	setAdmin,
}) => {
	const [isSidebarOpen, setSidebarOpen] = useState(true);
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
							setSidebarOpen={setSidebarOpen}
						/>
					</div>
				) : (
					""
				)}
				<div className='panel-container'>
					<Navbar
						setSidebarOpen={setSidebarOpen}
						admin={admin}
						isSidebarOpen={isSidebarOpen}
						setAdmin={setAdmin}
					/>

					<div className='main-panel-container'></div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
