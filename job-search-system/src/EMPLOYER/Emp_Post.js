import React, { Component } from "react";
import DeleteIcon from "../Images/DeleteIcon.png";
import LocationIcon from "../Images/LocationIcon.png";
import { Link } from "react-router-dom";
import TimeStamp from "../TimeStamp";
import PostContent from "../JOBSEEKER/Home-Folder/PostContent";
import "./Emp_Post.css";
import Modal from "../JOBSEEKER/Home-Folder/Modal";
import axios from "axios";

export class Emp_Post extends Component {
	constructor() {
		super();
		this.state = {
			showMore: [false],
			isModalOpen: false,
		};
	}

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

	toggle = () => {
		this.props.toggleUpdateModal(true);
		this.props.locatePost(this.props.companyJobPost);
	};

	updateContent = () => {
		this.props.toggle();
		this.props.setTargetJobPost(this.props.companyJobPost);
	};

	deletePost = async () => {
		const { JobID } = this.props.companyJobPost;
		await axios
			.delete(`http://localhost:2000/api/delete-jobPost/${JobID}`)
			.then(async (response) => {
				console.log("Post has been deleted");
				await this.onCloseModal();
				await this.props.deleteEmployerPost(JobID);
			});
		await axios
			.delete(`http://localhost:2000/api/delete-job-applicants/${JobID}`)
			.then(async (response) => {
				console.log("Job Applicants have been deleted");
			});
		await axios
			.delete(`http://localhost:2000/api/delete-applied-job/${JobID}`)
			.then(async (response) => {
				console.log("Applied Job has been deleted");
			});
	};

	render() {
		const { companyJobPost, darkTheme } = this.props;

		return (
			<div className='post-container'>
				<div className='post-header'>
					<div className='upperLeft-info'>
						<Link to='/employer/business-profile'>
							<div className='account-profile'>
								<img
									src={`../assets/${companyJobPost.Company_Image}`}
									alt='Stablishment'
								/>
							</div>
						</Link>

						<div className='basic-info'>
							<Link to='/employer/business-profile'>
								<h2>{companyJobPost.Company_Name}</h2>
							</Link>

							<div className='date-address'>
								<p
									title={`${companyJobPost.Month}/${companyJobPost.Day}/${companyJobPost.Year}`}>
									{TimeStamp.setTimeStamp(
										companyJobPost.Minutes,
										companyJobPost.Hour,
										companyJobPost.Day,
										companyJobPost.Month,
										companyJobPost.Year
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
									<p>{companyJobPost.Company_Address}</p>
								</div>
							</div>
						</div>
					</div>
					<div className='upperRight-info'>
						<img
							src={DeleteIcon}
							alt='Delete'
							title={`Close this post from ${companyJobPost.Company_Name}`}
							onClick={this.viewModal}
							style={
								darkTheme
									? { filter: "brightness(0.7)" }
									: { filter: "brightness(0.3)" }
							}
						/>

						{this.state.isModalOpen ? (
							<Modal
								headText='Delete Post Confirmation'
								modalText={`Are you sure you want to permanently delete this post?`}
								confirmText='Yes'
								closeText='No'
								close={this.onCloseModal}
								confirm={this.deletePost}
								path='/employer/jobs'
							/>
						) : (
							""
						)}
					</div>
				</div>

				<div className='post-body'>
					<div className='post-basic-content'>
						<h3 className='job-title'>{companyJobPost.Job_Title}</h3>

						<div className='post-detail-container'>
							<div className='post-detail-group1'>
								<div className='post-detail'>
									<p>Job Category:</p>
									<h4>{companyJobPost.Category}</h4>
								</div>
								<div className='post-detail'>
									<p>Required Employees:</p>
									<h4>{companyJobPost.Required_Employees}</h4>
								</div>
								<div className='post-detail'>
									<p>Salary:</p>
									<h4>₱ {companyJobPost.Salary}</h4>
								</div>
							</div>

							<div className='post-detail-group2'>
								<div className='post-detail'>
									<p>Job Type:</p>
									<h4>{companyJobPost.Job_Type}</h4>
								</div>
								<div className='post-detail'>
									<p>Preferred Sex:</p>
									<h4>{companyJobPost.Preferred_Sex}</h4>
								</div>
								<div className='post-detail'>
									<p>Job Vacancy Status:</p>
									<div className='active-status'>
										<div
											className='active-circle'
											style={
												this.props.companyJobPost.Active_Status ===
												"Active"
													? {
															backgroundColor: "#00ff40",
													  }
													: {
															backgroundColor: "#ff0000",
													  }
											}></div>
										<h4>{companyJobPost.Active_Status}</h4>
									</div>
								</div>
							</div>
						</div>
					</div>
					<PostContent
						info={companyJobPost}
						showMore={this.state.showMore}
					/>

					<div className='post-btn'>
						<button onClick={this.seeMore} className='see-more'>
							{this.state.showMore ? "See More" : "See Less"}
						</button>
						<Link to='/employer/jobs'>
							<button
								className='apply-btn'
								onClick={this.toggle}
								disabled={
									companyJobPost.Active_Status === "Closed"
										? "disabled"
										: ""
								}
								style={
									companyJobPost.Active_Status === "Closed"
										? { opacity: "0.3" }
										: { opacity: "1" }
								}>
								{companyJobPost.Active_Status === "Closed"
									? "Closed"
									: "Update"}
							</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Emp_Post;