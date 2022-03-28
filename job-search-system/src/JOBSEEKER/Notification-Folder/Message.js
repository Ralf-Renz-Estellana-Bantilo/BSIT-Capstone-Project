import React, { Component } from "react";
import LocationIcon from "../../Images/LocationIcon.png";
import CloseIcon from "../../Images/CloseIcon.png";
import "./Message.css";
import Footer from "../Home-Folder/Footer";
import { withRouter } from "react-router-dom";
import AppConfiguration from "../../AppConfiguration";

export class Message extends Component {
	viewCompanyProfile = async () => {
		const { feedback, activePage } = this.props;

		await this.props.setCompanyID(feedback.CompanyID);
		await this.props.history.push(`/jobseeker/${activePage}/company-profile`);
	};
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	componentWillUnmount() {
		const { feedback } = this.props;
		if (feedback.Status === "New") {
			this.props.updateNotificationStatus(feedback.FeedbackID);
		}
	}

	render() {
		const { feedback, currentUser, darkTheme } = this.props;
		const status = feedback.Application_Status;

		const month = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		let convertedMonth = "";
		let convertHour = 0;
		let convertMinute = "";
		let convertStatus = "";
		let ampm = "";

		for (let index = 0; index < month.length; index++) {
			if (feedback.Month === index + 1) {
				convertedMonth = month[index];
			}
		}

		if (feedback.Hour > 12) {
			ampm = "PM";
			convertHour = feedback.Hour - 12;
		} else {
			ampm = "AM";
			convertHour = feedback.Hour;
		}

		if (feedback.Minutes < 10) {
			convertMinute = `0${feedback.Minutes}`;
		} else {
			convertMinute = `${feedback.Minutes}`;
		}

		if (feedback.Application_Status === "Meet") {
			convertStatus = "Scheduled for an Interview";
		} else if (feedback.Application_Status === "(n/a)") {
			convertStatus = "Potential Employer";
		} else {
			convertStatus = feedback.Application_Status;
		}

		return (
			<div className='message-container'>
				<h4>
					{convertStatus === "Potential Employer"
						? "JOB OFFER"
						: "FEEDBACK"}
				</h4>
				<div className='message-header'>
					<div
						className='message-close'
						onClick={() => {
							this.props.closeMessagePanel();
						}}>
						<img src={CloseIcon} alt='Close' title='Close' />
					</div>
					<div
						className='message-company-profile'
						onClick={this.viewCompanyProfile}>
						<img
							src={`${AppConfiguration.url()}/assets/images/${
								feedback.Company_Image
							}`}
							alt='Company Profile'
							title='View Company Details'
						/>
					</div>
					<div className='message-company-name'>
						<h3>{feedback.Company_Name}</h3>
						<div className='message-company-address'>
							<img
								src={LocationIcon}
								alt=''
								style={
									darkTheme
										? { filter: "brightness(1)" }
										: { filter: "brightness(0.1)" }
								}
							/>
							<p className='message-address'>
								{feedback.Company_Address}
							</p>
						</div>
						<p className='message-job-title'>{feedback.Job_Title}</p>
						<div className='message-status'>
							<h3
								style={
									status === "Hired"
										? {
												borderRadius: "5px",
												background:
													"linear-gradient(20deg, #00f33d, #88ff00)",
												color: "#131313",
										  }
										: status === "Meet"
										? {
												borderRadius: "5px",
												background:
													"linear-gradient(20deg, #00b2ff, #006aff)",
										  }
										: convertStatus === "Potential Employer"
										? {
												borderRadius: "5px",
												background:
													"linear-gradient(20deg, #00b2ff, #006aff)",
										  }
										: status === "Declined"
										? {
												borderRadius: "5px",
												background:
													"linear-gradient(20deg, #ff004c, #ff7b00)",
										  }
										: {}
								}>
								{convertStatus}
							</h3>
						</div>
					</div>{" "}
				</div>
				<div className='message-panel-container'>
					<p className='message-time'>{`${convertedMonth} ${feedback.Day}, ${feedback.Year} at ${convertHour}:${convertMinute} ${ampm}`}</p>
					<div className='message-panels'>
						<div className='message-left-panel'>
							<div className='message-left-panel-img'>
								<img
									src={`${AppConfiguration.url()}/assets/images/${
										feedback.Company_Image
									}`}
									alt='Company Profile'
								/>
							</div>
						</div>
						<div className='message-right-panel'>
							<div className='message-text'>
								<p>{feedback.Message}</p>
							</div>
						</div>

						{feedback.Status === "Seen" && (
							<div className='seen-indicator-container'>
								<div className='seen-indicator'>
									<img
										src={`${AppConfiguration.url()}/assets/images/${
											currentUser.User_Image
										}`}
										alt='Company Profile'
										title='Seen'
									/>
								</div>
							</div>
						)}
					</div>
				</div>
				<div className='message-note'>
					<p>You can't reply to this message!</p>
					{/* <p>Chat system is not supported by this system!</p> */}
				</div>
				{/* <Footer /> */}
			</div>
		);
	}
}

export default withRouter(Message);
