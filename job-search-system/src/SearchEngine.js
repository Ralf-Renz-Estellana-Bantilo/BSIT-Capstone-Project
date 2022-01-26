import React, { Component } from "react";
import "./SearchEngine.css";
import LeftArrow from "./Images/LeftArrow.png";
import { Link } from "react-router-dom";
import Post from "./JOBSEEKER/Home-Folder/Post";
import LightLoadingSearch from "./Images/LightLoadingSearch.gif";
import LoadingSearch2 from "./Images/LoadingSearch2.gif";

import SearchApplicants from "./EMPLOYER/Applicants-Folder/SearchApplicants";

export class SearchEngine extends Component {
	constructor() {
		super();
		this.state = {
			text: "",
			scrollPosition: 0,
			countApplicant: 0,
		};
	}

	setText = async (e) => {
		await this.setState({
			text: e,
			countApplicant: 0,
		});

		localStorage.setItem("search", this.state.text);
		window.scrollTo(0, 0);
	};

	handleChangePage = async (page) => {
		await this.props.handleChangePage(page);
	};

	componentDidMount = async () => {
		const prevScroll = localStorage.getItem("searchScroll");
		const prevSearch = localStorage.getItem("search");

		if (prevSearch === null) {
			await this.setState({
				text: "",
			});
		} else {
			await this.setState({
				text: prevSearch,
			});
		}
		if (prevScroll === null) {
			await this.setState({
				scrollPosition: 0,
			});
		} else {
			await this.setState({
				scrollPosition: prevScroll,
			});
		}

		if (`${this.props.activePage}` !== "search") {
			localStorage.setItem("previousPage", this.props.activePage);
		}

		await this.handleChangePage("search");
		window.scrollTo(0, prevScroll);

		localStorage.setItem("isSearchOpen", true);
	};

	componentWillUnmount = async () => {
		localStorage.setItem("searchScroll", window.pageYOffset);
		window.scrollTo(0, window.pageYOffset);

		await this.setState({
			text: this.state.text,
		});
	};

	render() {
		const previousPage = localStorage.getItem("previousPage");
		const activePage = localStorage.getItem("activePage");
		const { infos, applicants, employerFeedback, darkTheme } = this.props;
		const applicantSession = sessionStorage.getItem("ApplicantID");
		const companySession = sessionStorage.getItem("CompanyID");

		if (this.state.scrollPosition !== 0) {
			localStorage.setItem("searchScroll", this.state.scrollPosition);
			window.scrollTo(0, this.state.scrollPosition);
		}

		const userTypeSession = sessionStorage.getItem("UserType");
		let userType = "";
		if (userTypeSession === "Job Seeker") {
			userType = "jobseeker";
		} else {
			userType = "employer";
		}

		let count = 0;

		return (
			<div className='search-container'>
				<div className='search-panel'>
					<Link
						to={
							applicantSession
								? `/${userType}/${previousPage}`
								: `/${userType}/${activePage}`
						}>
						<img
							className='search-panel-icon'
							src={LeftArrow}
							alt='back'
							style={
								darkTheme
									? { filter: "brightness(1)" }
									: { filter: "brightness(0.3)" }
							}
						/>
					</Link>
					<input
						autoFocus
						className='search-panel-input'
						type='text'
						placeholder={
							userType === "jobseeker"
								? "Search here (e.g. Job Title, Category, Location, etc)"
								: "Search here (e.g. Preffered Job, Preffered Category, etc)"
						}
						onChange={(e) => {
							this.setText(e.target.value);
						}}
						value={this.state.text}
					/>
				</div>

				{applicantSession && (
					<>
						{" "}
						{/* Job Seeker Search Engine */}
						{this.state.text !== "" && this.state.text.length > 1 && (
							<div className='search-engine'>
								{infos.map((info) => {
									if (
										(`${info.Job_Title}`
											.toLowerCase()
											.includes(
												`${this.state.text}`.toLowerCase()
											) &&
											info.Active_Status === "Active") ||
										(`${info.Job_Type}`
											.toLowerCase()
											.includes(
												`${this.state.text}`.toLowerCase()
											) &&
											info.Active_Status === "Active") ||
										(`${info.Category}`
											.toLowerCase()
											.includes(
												`${this.state.text}`.toLowerCase()
											) &&
											info.Active_Status === "Active") ||
										(`${info.Company_Address}`
											.toLowerCase()
											.includes(
												`${this.state.text}`.toLowerCase()
											) &&
											info.Active_Status === "Active") ||
										(`${info.Company_Name}`
											.toLowerCase()
											.includes(
												`${this.state.text}`.toLowerCase()
											) &&
											info.Active_Status === "Active") ||
										(`${info.Preferred_Sex}`
											.toLowerCase()
											.includes(
												`${this.state.text}`.toLowerCase()
											) &&
											info.Active_Status === "Active")
									) {
										count += 1;
									}
								})}
								<p className='results'>{`Finding results for "${this.state.text}" | found ${count}`}</p>
								{infos.map((info) => {
									if (
										(`${info.Job_Title}`
											.toLowerCase()
											.includes(
												`${this.state.text}`.toLowerCase()
											) &&
											info.Active_Status === "Active") ||
										(`${info.Job_Type}`
											.toLowerCase()
											.includes(
												`${this.state.text}`.toLowerCase()
											) &&
											info.Active_Status === "Active") ||
										(`${info.Category}`
											.toLowerCase()
											.includes(
												`${this.state.text}`.toLowerCase()
											) &&
											info.Active_Status === "Active") ||
										(`${info.Company_Address}`
											.toLowerCase()
											.includes(
												`${this.state.text}`.toLowerCase()
											) &&
											info.Active_Status === "Active") ||
										(`${info.Company_Name}`
											.toLowerCase()
											.includes(
												`${this.state.text}`.toLowerCase()
											) &&
											info.Active_Status === "Active") ||
										(`${info.Preferred_Sex}`
											.toLowerCase()
											.includes(
												`${this.state.text}`.toLowerCase()
											) &&
											info.Active_Status === "Active")
									) {
										return (
											<div
												className='feed-container'
												key={info.JobID}>
												<Post
													info={info}
													onDelete={this.deletePost}
													toggleCompanyProfile={
														this.toggleCompanyProfile
													}
													activePage={this.props.activePage}
													setCompanyID={this.props.setCompanyID}
													isDeleted={this.props.isDeleted}
													numApplicants={this.props.numApplicants}
													showDelete={false}
													darkTheme={this.props.darkTheme}
												/>
											</div>
										);
									}
								})}
							</div>
						)}
					</>
				)}
				{companySession && (
					<>
						{" "}
						{this.state.text !== "" && this.state.text.length > 1 && (
							<div className='search-engine'>
								{applicants.map((applicant) => {
									if (
										(`${applicant.Preferred_Job}`
											.toLowerCase()
											.includes(
												`${this.state.text}`.toLowerCase()
											) &&
											applicant.Hiring_Status === "Active") ||
										(`${applicant.Preferred_Category}`
											.toLowerCase()
											.includes(
												`${this.state.text}`.toLowerCase()
											) &&
											applicant.Hiring_Status === "Active") ||
										(`${applicant.Home_Address}`
											.toLowerCase()
											.includes(
												`${this.state.text}`.toLowerCase()
											) &&
											applicant.Hiring_Status === "Active")
									) {
										count += 1;
									}
								})}

								<p
									className='results'
									style={{
										marginBottom: "15px",
									}}>{`Finding results for "${this.state.text}" | found ${count} `}</p>

								{applicants.map((applicant) => {
									if (
										(`${applicant.Preferred_Job}`
											.toLowerCase()
											.includes(
												`${this.state.text}`.toLowerCase()
											) &&
											applicant.Hiring_Status === "Active") ||
										(`${applicant.Preferred_Category}`
											.toLowerCase()
											.includes(
												`${this.state.text}`.toLowerCase()
											) &&
											applicant.Hiring_Status === "Active") ||
										(`${applicant.Home_Address}`
											.toLowerCase()
											.includes(
												`${this.state.text}`.toLowerCase()
											) &&
											applicant.Hiring_Status === "Active")
									) {
										return (
											<div key={applicant.ApplicantID}>
												<SearchApplicants
													applicant={applicant}
													setHiree={this.props.setHiree}
													employerFeedback={employerFeedback}
													setEmployerMessage={
														this.props.setEmployerMessage
													}
													darkTheme={darkTheme}
												/>
											</div>
										);
									}
								})}
							</div>
						)}{" "}
					</>
				)}

				{this.state.text === "" ? (
					<div className='search-content'>
						<div className='search-text'>
							<div className='search-gif'>
								<img
									src={darkTheme ? LoadingSearch2 : LightLoadingSearch}
									alt='Loading gif'
								/>
							</div>
							Nothing to display, start typing...
						</div>
					</div>
				) : (
					""
				)}
			</div>
		);
	}
}

export default SearchEngine;
