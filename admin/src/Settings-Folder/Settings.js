import React, { useEffect, useState } from "react";
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
}) => {
	const [isSidebarOpen, setSidebarOpen] = useState(true);

	useEffect(() => {
		setActivePage("Settings");
		localStorage.setItem("activePage", "Settings");
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
						isSidebarOpen={isSidebarOpen}
					/>

					<div className='main-panel-container'>
						<p>SETTINGS PANEL</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
