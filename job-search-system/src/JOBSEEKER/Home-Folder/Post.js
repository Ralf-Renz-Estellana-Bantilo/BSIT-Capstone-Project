import React, { Component } from "react";
import "./Post.css";
import DeleteIcon from "../../Images/HideIcon.png";
import LocationIcon from "../../Images/LocationIcon.png";
import PostContent from "./PostContent";
import { Link } from "react-router-dom";
import TimeStamp from "../../TimeStamp";
import Modal from "./Modal";

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

		let filteredCandidate = [];

		filteredCandidate = numApplicants.filter(
			(numApplicant) => numApplicant.JobID === info.JobID
		);

		let address =
			info.Company_Address.split(", ")[
				info.Company_Address.split(", ").length - 1
			];

		let finalSalary = "";
		let jobSalary = info.Salary;
		for (let a = 1; a <= jobSalary.length; a++) {
			if (
				jobSalary.length - a === 3 ||
				jobSalary.length - a === 6 ||
				jobSalary.length - a === 9 ||
				jobSalary.length - a === 12 ||
				jobSalary.length - a === 15 ||
				jobSalary.length - a === 18 ||
				jobSalary.length - a === 21
			) {
				finalSalary += jobSalary[a - 1] + ",";
			} else {
				finalSalary += jobSalary[a - 1];
			}
		}

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
										<p>Salary:</p>
										<h4>₱ {finalSalary}</h4>
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
