import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeIconFilled from "./Images/HomeIconFilled.png";
import HomeIconOutlined from "./Images/HomeIconOutlined.png";
import ProfileIconFilled from "./Images/ProfileIconFilled.png";
import ProfileIconOutlined from "./Images/ProfileIconOutlined.png";
import NotificationIconFilled from "./Images/NotificationIconFilled.png";
import NotificationIconOutlined from "./Images/NotificationIconOutlined.png";
import MenuIconFilled from "./Images/MenuIconFilled.png";
import MenuIconOutlined from "./Images/MenuIconOutlined.png";
import "./Navbar.css";
import axios from "axios";
import AppConfiguration from "./AppConfiguration";

export class Navbar extends Component {
	state = {
		numberOfClick: 0,
		badge: 0,
		newNotifications: 0,
	};

	handleScrollTop = () => {
		this.setState({
			numberOfClick: this.state.numberOfClick + 1,
			badge: this.state.numberOfClick,
		});

		window.scrollTo(0, 0);
		this.resetNumClick();
	};

	resetNumClick = () => {
		this.setState({
			numberOfClick: 0,
		});
	};

	refreshNotifications = async () => {
		try {
			const applicantSession = sessionStorage.getItem("ApplicantID");
			// Fetching Employer Feedback Data
			await axios
				.post(
					`${AppConfiguration.url()}/api/read-specific-applicant-notification`,
					{
						applicantID: applicantSession,
					}
				)
				.then(async (response) => {
					await this.props.setEmployerFeedBack(response.data);
				});
		} catch (error) {
			//
		}
	};

	componentDidMount = async () => {
		document.title = "Job Seeker | Job Search Catarman";
	};

	render() {
		const active = `${this.props.activePage}`;
		const { employerFeedback, darkTheme, applicants } = this.props;
		const applicantSession = sessionStorage.getItem("ApplicantID");

		let currentJobSeekerData = applicants.filter(
			(applicant) => applicant.ApplicantID === applicantSession
		);

		let countNewNotif = 0;

		for (let index = 0; index < employerFeedback.length; index++) {
			if (employerFeedback[index].Status === "New") {
				countNewNotif += 1;
			}
		}

		return (
			<div className='navbar-container'>
				<div className='navbar'>
					<Link to='/jobseeker/home' onClick={this.handleScrollTop}>
						<img
							src={active === "home" ? HomeIconFilled : HomeIconOutlined}
							alt='Home Icon Filled'
							style={
								darkTheme
									? { filter: "brightness(1)" }
									: { filter: "brightness(0.25)" }
							}
						/>
					</Link>

					<Link to='/jobseeker/profile'>
						<div className='img-wrapper'>
							{currentJobSeekerData.map((data) => {
								if (
									!data.Preferred_Category ||
									data.Preferred_Category === "" ||
									data.Preferred_Category === undefined ||
									data.Preferred_Category === null
								) {
									return (
										<div className='badge'>
											<p>!</p>
										</div>
									);
								}
							})}

							<img
								src={
									active === "profile"
										? ProfileIconFilled
										: ProfileIconOutlined
								}
								alt='Profile Icon Outlined'
								style={
									darkTheme
										? { filter: "brightness(1)" }
										: { filter: "brightness(0.25)" }
								}
							/>
						</div>
					</Link>

					<Link
						to='/jobseeker/notification'
						onClick={this.refreshNotifications}>
						<div className='img-wrapper'>
							{countNewNotif === 0 ? (
								""
							) : (
								<div className='badge'>
									<p>{countNewNotif}</p>
								</div>
							)}
							<img
								src={
									active === "notification"
										? NotificationIconFilled
										: NotificationIconOutlined
								}
								alt='Notification Icon Outlined'
								style={
									darkTheme
										? { filter: "brightness(1)" }
										: { filter: "brightness(0.25)" }
								}
							/>
						</div>
					</Link>

					<Link to='/jobseeker/menu'>
						<img
							src={active === "menu" ? MenuIconFilled : MenuIconOutlined}
							alt='Menu Icon Outlined'
							style={
								darkTheme
									? { filter: "brightness(1)" }
									: { filter: "brightness(0.25)" }
							}
						/>
					</Link>
				</div>
			</div>
		);
	}
}

export default Navbar;
