import React, { Component } from "react";
import "./Post.css";
import DeleteIcon from "../../Images/DeleteIcon.png";
import LocationIcon from "../../Images/LocationIcon.png";
import PostContent from "./PostContent";
import { Link } from "react-router-dom";
import TimeStamp from "../../TimeStamp";
import Modal from "./Modal";
import axios from "axios";

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
		const { info, darkTheme, numApplicants } = this.props;
		const { timeStamp } = this.props.info;

		let filteredCandidate = [];

		filteredCandidate = numApplicants.filter(
			(numApplicant) => numApplicant.JobID === info.JobID
		);

		return (
			<>
				<div className='post-container'>
					<div className='post-header'>
						<div className='upperLeft-info'>
							<Link
								to={`/jobseeker/${this.props.activePage}/company-profile`}
								onClick={() => {
									this.props.setCompanyID(info.CompanyID);
								}}>
								<div className='account-profile'>
									<img
										src={`../assets/${info.Company_Image}`}
										alt='Stablishment'
									/>
								</div>
							</Link>

							<div className='basic-info'>
								<h2>{info.Company_Name}</h2>

								<div className='date-address'>
									<p>
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
													? { filter: "brightness(1)" }
													: { filter: "brightness(0.3)" }
											}
										/>
										<p>{info.Company_Address}</p>
									</div>
								</div>
							</div>
						</div>
						<div className='upperRight-info'>
							{this.props.showDelete && (
								<img
									src={DeleteIcon}
									alt='Delete'
									title={`Close this post from ${info.Company_Name}`}
									onClick={this.viewModal}
									style={
										darkTheme
											? { filter: "brightness(1)" }
											: { filter: "brightness(0.3)" }
									}
								/>
							)}

							{this.state.isModalOpen ? (
								<Modal
									headText='Remove Post Confirmation'
									modalText={`Are you sure you want to remove this post from ${info.Company_Name}?`}
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
										<p>Salary:</p>
										<h4>₱ {info.Salary}</h4>
									</div>
									<div className='post-detail'>
										<p>Job Type:</p>
										<h4>{info.Job_Type}</h4>
									</div>
									<div className='post-detail'>
										<p>Preferred Sex:</p>
										<h4>{info.Preferred_Sex}</h4>
									</div>
								</div>

								<div className='post-detail-group2'>
									<div className='post-detail'>
										<p>Required Employees:</p>
										<h4>{info.Required_Employees}</h4>
									</div>
									<div className='post-detail'>
										<p>Applied Applicants:</p>
										<h4>{filteredCandidate.length}</h4>
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
							<Link to={`/jobseeker/${this.props.activePage}/apply-now`}>
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
