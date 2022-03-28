import React, { Component } from "react";
import Logo from "./Images/Logo.png";
import SearchIcon from "./Images/SearchIcon.png";
import "./Header.css";
import AppConfiguration from "./AppConfiguration";

export class Header extends Component {
	render() {
		let { First_Name, Last_Name, User_Image } = this.props.currentUser;

		const userTypeSession = sessionStorage.getItem("UserType");
		let userType = "";
		if (userTypeSession === "Job Seeker") {
			userType = "jobseeker";
		} else {
			userType = "employer";
		}

		return (
			<div className='header-container'>
				<header>
					<div className='header-left'>
						<img src={Logo} alt='Logo' className='logo-image' />

						{/* <Link to={`/${userType}/search`}> */}
						<form className='search-bar'>
							<input
								type='text'
								placeholder='Search here'
								onFocus={() =>
									this.props.history.push(`/${userType}/search`)
								}
							/>
							<img
								src={SearchIcon}
								alt='Search'
								className='search-icon-image'
								onClick={() =>
									this.props.history.push(`/${userType}/search`)
								}
							/>
						</form>
						{/* </Link> */}
					</div>

					<div className='profile-holder'>
						<h3 className='profile-name'>{`${First_Name} ${Last_Name}`}</h3>
						{/* <Link to='/jobseeker/profile'> */}
						<div
							className='account-profile'
							onClick={() =>
								this.props.history.push(`/${userType}/profile`)
							}>
							<img
								src={`${AppConfiguration.url()}/assets/images/${User_Image}`}
								style={{ height: "60px" }}
							/>
						</div>
						{/* </Link> */}
					</div>
				</header>
			</div>
		);
	}
}

export default Header;
