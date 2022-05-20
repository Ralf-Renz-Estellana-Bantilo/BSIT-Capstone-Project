import React, { Component } from "react";
import "./Post.css";
import DeleteIcon from "../../Images/HideIcon.png";
import LocationIcon from "../../Images/LocationIcon.png";
import PostContent from "./PostContent";
import { Link } from "react-router-dom";
import TimeStamp from "../../TimeStamp";
import Modal from "./Modal";
import Resources from "../../Resources";
import AppConfiguration from "../../AppConfiguration";

export class Post extends Component {
	constructor() {
		super();
		this.state = {
			showMore: [false],
			isModalOpen: false,
			numApplicants: [],
		};
	}

	deletePost = () => {
		this.props.onDelete(this.props.info.JobID);
		this.onCloseModal();
	};

	seeMore = (e) => {
		if (this.state.showMore === true) {
			this.setState({
				showMore: !this.state.showMore,
			});
		} else {
			this.setState({
				showMore: !this.state.showMore,
			});
		}
	};

	viewModal = () => {
		this.setState({
			isModalOpen: true,
		});
	};

	onCloseModal = () => {
		this.setState({
			isModalOpen: false,
		});
	};

	render() {
		const { info, darkTheme, numApplicants, acronym } = this.props;

		let filteredCandidate = [];
		let filteredHiredCandidate = [];

		filteredCandidate = numApplicants.filter(
			(numApplicant) => numApplicant.JobID === info.JobID
		);
		filteredHiredCandidate = numApplicants.filter(
			(numApplicant) =>
				numApplicant.JobID === info.JobID &&
				numApplicant.Candidate_Status === "Hired"
		);

		let address =
			info.Company_Address.split(", ")[
				info.Company_Address.split(", ").length - 1
			];

		return (
			<>
				<div className='post-container'>
					<div
						className='post-header'
						style={
							darkTheme ? { borderBottom: "1px solid #4d4d4d" } : {}
						}>
						<div className='upperLeft-info'>
							<Link
								to={`/jobseeker/${this.props.activePage}/company-profile`}
								onClick={() => {
									this.props.setCompanyID(info.CompanyID);
								}}>
								<div
									className='account-profile'
									title='View Establishment Details'>
									<img
										src={info.Company_Image}
										// src={`${AppConfiguration.url()}/assets/images/${
										// 	info.Company_Image
										// }`}
										alt='Company'
									/>
								</div>
							</Link>

							<div className='basic-info'>
								{acronym !== "(n/a)" ? (
									<h2 title={info.Company_Name}>
										{acronym} <span>(shortened)</span>
										{/* {acronym} <span>(acronym/abbreviation)</span> */}
									</h2>
								) : (
									<h2>{info.Company_Name}</h2>
								)}

								<div className='date-address'>
									<p title={`${info.Month}/${info.Day}/${info.Year}`}>
										{TimeStamp.setTimeStamp(
											info.Minutes,
											info.Hour,
											info.Day,
											info.Month,
											info.Year
										)}
									</p>
									<div className='address'>
										<img
											src={LocationIcon}
											alt='Location Icon'
											style={
												darkTheme
													? { filter: "brightness(0.7)" }
													: { filter: "brightness(0.3)" }
											}
										/>
										<p title={`${info.Company_Address}`}>{address}</p>
									</div>
								</div>
							</div>
						</div>
						<div className='upperRight-info'>
							{this.props.showDelete && (
								<img
									src={DeleteIcon}
									alt='Delete'
									title={`Hide this post from ${info.Company_Name}`}
									onClick={this.viewModal}
									style={
										darkTheme
											? { filter: "brightness(0.7)", height: "18px" }
											: { filter: "brightness(0.3)", height: "18px" }
									}
								/>
							)}

							{this.state.isModalOpen ? (
								<Modal
									headText='Hide Post Confirmation'
									modalText={`Are you sure you want to hide this post from ${info.Company_Name}?`}
									confirmText='Yes'
									closeText='No'
									close={this.onCloseModal}
									confirm={this.deletePost}
								/>
							) : (
								""
							)}
						</div>
					</div>

					<div className='post-body'>
						<div className='post-basic-content'>
							<h3 className='job-title'>{info.Job_Title}</h3>
							<p className='job-category'>({info.Category})</p>

							<div className='post-detail-container'>
								<div className='post-detail-group1'>
									<div className='post-detail'>
										<p>Salary Range:</p>
										<h4>
											₱ {Resources.formatMoney(info.Minimum_Salary)}{" "}
											- ₱{" "}
											{Resources.formatMoney(info.Maximum_Salary)}
										</h4>
									</div>
									<div className='post-detail'>
										<p>Nature of Work:</p>
										<h4>{info.Job_Type}</h4>
									</div>
									<div className='post-detail'>
										<p>Preferred Gender:</p>
										<h4>{info.Preferred_Sex}</h4>
									</div>
									<div className='post-detail'>
										<p>Civil Status:</p>
										<h4>{info.Civil_Status}</h4>
									</div>
									<div className='post-detail'>
										<p>Place of Work:</p>
										<h4>
											{info.Work_Place === info.Company_Address
												? "Company Location"
												: info.Work_Place}
										</h4>
									</div>
								</div>

								<div className='post-detail-group2'>
									<div className='post-detail'>
										<p>Vacancy Count:</p>
										<h4>{info.Required_Employees}</h4>
									</div>
									<div className='post-detail'>
										<p>Applications Received:</p>
										<h4>{filteredCandidate.length}</h4>
									</div>
									<div className='post-detail'>
										<p>Applicants Hired:</p>
										<h4>{filteredHiredCandidate.length}</h4>
									</div>
									<div className='post-detail'>
										<p>Job Vacancy Deadline:</p>
										<h4>
											{info.Job_Requirements !== ""
												? info.Job_Requirements
												: "Not Set"}
										</h4>
									</div>
									<div className='post-detail'>
										<p>Job Vacancy Status:</p>
										<div className='active-status'>
											<div
												className='active-circle'
												style={
													this.props.info.Active_Status ===
													"Active"
														? { backgroundColor: "#00ff40" }
														: { backgroundColor: "#ff0000" }
												}></div>
											<h4>{info.Active_Status}</h4>
										</div>
									</div>
								</div>
							</div>
						</div>

						<PostContent info={info} showMore={this.state.showMore} />

						<div className='post-btn'>
							<button onClick={this.seeMore} className='see-more'>
								{this.state.showMore ? "See More" : "See Less"}
							</button>
							<Link
								to={`/jobseeker/${this.props.activePage}/application-form`}>
								<button
									title={
										info.Is_Applied === true
											? `Applied as ${info.Job_Title}`
											: `Apply as ${info.Job_Title}`
									}
									className='apply-btn'
									onClick={() => {
										this.props.setCompanyID(info.JobID);
									}}
									disabled={
										info.Is_Applied === true ||
										info.Active_Status === "Closed"
											? "disabled"
											: ""
									}
									style={
										info.Is_Applied === true ||
										info.Active_Status === "Closed"
											? { opacity: "0.3" }
											: { opacity: "1" }
									}>
									{info.Is_Applied === true ? "Applied" : "Apply Now"}
								</button>
							</Link>
						</div>
					</div>
				</div>
			</>
		);
	}
}

Post.defaultProps = {
	showDelete: true,
};

export default Post;
