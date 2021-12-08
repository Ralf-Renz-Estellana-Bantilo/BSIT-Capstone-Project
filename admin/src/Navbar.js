import React from "react";
import User from "./Images/User.png";
import Logout from "./Images/Logout.png";
import MenuIconFilled from "./Images/MenuIconFilled.png";
import CreateIcon from "./Images/CreateIcon.png";
import "./Navbar.css";

const Navbar = ({ isSidebarOpen, setSidebarOpen, activePage }) => {
	return (
		<div className='navbar-container'>
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
				{activePage === "Job Posts" && (
					<div className='navbar-button-container'>
						{/* <button>Post a Job Vacancy</button> */}
						<img
							src={CreateIcon}
							title='Post a Job Vacancy'
							alt='Create Job Post Icon'
						/>
					</div>
				)}
				<div className='profile-container'>
					<h5>Ralf Renz Bantilo</h5>
					<div className='profile-img'>
						<img src={User} alt='Administrator' />
					</div>
				</div>
				<div className='logout-container'>
					<img src={Logout} alt='Logout' title='Logout' />
				</div>
			</div>
		</div>
	);
};

Navbar.defaultProps = {
	activePage: "whatever",
};

export default Navbar;
