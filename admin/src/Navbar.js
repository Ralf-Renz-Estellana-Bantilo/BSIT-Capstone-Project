import React, { useState } from "react";
import User from "./Images/User.png";
import Logout from "./Images/Logout.png";
import MenuIconFilled from "./Images/MenuIconFilled.png";
import CreateIcon from "./Images/CreateIcon.png";
import "./Navbar.css";
import Modal from "./Modal";

const Navbar = ({
	isSidebarOpen,
	setSidebarOpen,
	activePage,
	isJobPostPanelOpen,
	setJobPostPanelOpen,
}) => {
	const [isModalOpen, setModalOpen] = useState(false);
	const onCloseModal = () => {
		setModalOpen(false);
	};

	const openJobPostPanel = () => {
		setJobPostPanelOpen(true);
	};

	const closeJobPostPanel = () => {
		setJobPostPanelOpen(false);
	};

	return (
		<div className='navbar-container'>
			{isModalOpen && (
				<Modal
					headText='Logout Confirmation'
					modalText={`Hey Admin, are you sure you want to logout?`}
					confirmText='Logout'
					closeText='Cancel'
					close={onCloseModal}
					confirm={onCloseModal}
					path='/'
				/>
			)}
			<div className='navbar-left-portion'>
				{!isSidebarOpen && (
					<img
						src={MenuIconFilled}
						alt='Menu'
						onClick={() => setSidebarOpen(!isSidebarOpen)}
					/>
				)}

				<input type='text' placeholder='Search here' />
			</div>

			<div className='navbar-right-portion'>
				{activePage === "Job Posts" && isJobPostPanelOpen === false ? (
					<div className='navbar-button-container'>
						{/* <button>Post a Job Vacancy</button> */}
						<img
							src={CreateIcon}
							title='Post a Job Vacancy'
							alt='Create Job Post Icon'
							onClick={openJobPostPanel}
						/>
					</div>
				) : (
					<div className='navbar-button-container'>
						<button onClick={closeJobPostPanel}>Go Back</button>
					</div>
				)}
				<div className='profile-container'>
					<h5>Ralf Renz Bantilo</h5>
					<div className='profile-img'>
						<img src={User} alt='Administrator' />
					</div>
				</div>
				<div className='logout-container'>
					<img
						src={Logout}
						alt='Logout'
						title='Logout'
						onClick={() => setModalOpen(true)}
					/>
				</div>
			</div>
		</div>
	);
};

Navbar.defaultProps = {
	activePage: "whatever",
	isJobPostPanelOpen: false,
	setJobPostPanelOpen: function () {
		console.log("Function");
	},
};

export default Navbar;
