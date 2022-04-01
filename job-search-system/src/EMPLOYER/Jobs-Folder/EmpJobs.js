import React, { Component } from "react";
import WorkPost from "./WorkPost";
import WorkPostHeader from "./WorkPostHeader";
import EmpNavbar from "../EmpNavbar";
import CloseIcon from "../../Images/CloseIcon.png";
import EmpGap from "../EmpGap";
import EmpPost from "../EmpPost";
import "./EmpJobs.css";
import { withRouter } from "react-router-dom";
import Indication from "../../Indication";
import Modal from "../../JOBSEEKER/Home-Folder/Modal";
export class Emp_Jobs extends Component {
	constructor() {
		super();
		this.state = {
			isUpdateModalOpen: false,
			targetJobPost: [],
			isCloseIndication: false,
		};
	}

	componentDidMount = async () => {
		const session = sessionStorage.getItem("UserID");

		if (!session) {
			localStorage.clear();
			this.props.history.push("/login");
		}

		localStorage.setItem("activePage", "jobs");
		localStorage.setItem("isSearchOpen", false);
	};

	toggleUpdateModal = async (condition) => {
		await this.setState({
			isUpdateModalOpen: condition,
		});
	};

	updateContent = () => {
		const { targetJobPost } = this.state;

		this.props.toggle();
		this.props.setTargetJobPost(targetJobPost);
	};

	locatePost = (post) => {
		this.setState({
			targetJobPost: post,
		});
	};

	toggleCloseJob = () => {
		this.setState({
			isCloseIndication: false,
		});
	};

	handleCloseJobPost = async () => {
		const { targetJobPost } = this.state;
		const { updateJobPostStatus } = this.props;
		await updateJobPostStatus(targetJobPost.JobID);

		await this.toggleCloseJob();
		await this.props.toggleClosePost();
	};

	render() {
		const { currentUser, companyJobPost, company } = this.props;
		const { targetJobPost } = this.state;

		const companyJobPostVisible = companyJobPost.filter(
			(post) => post.Is_Deleted !== "Deleted"
		);

		return (
			<div>
				<EmpGap />
				<EmpNavbar
					isSidebarOpen={this.props.isSidebarOpen}
					toggleSidebar={this.props.toggleSidebar}
					currentUser={currentUser}
					company={company}
					setCurrentUser={this.props.setCurrentUser}
					getJobApplicantsByCompany={this.props.getJobApplicantsByCompany}
					panel='Job Posts'
					darkTheme={this.props.darkTheme}
				/>

				{this.props.isDeleted === true && (
					<Indication
						type='secondary'
						text='JOB POST HAS BEEN DELETED!'
						method={this.props.closeDeleteState}
						delay={3}
						module='employer'
					/>
				)}

				{this.props.isCloseIndication && (
					<Indication
						type='secondary'
						text='JOB POST HAS BEEN CLOSED!'
						method={this.props.toggleClosePost}
						delay={3}
						module='employer'
					/>
				)}

				{this.state.isCloseIndication ? (
					<Modal
						headText='Close Post Confirmation'
						modalText={`Are you sure you want to close ${targetJobPost.Job_Title}?`}
						confirmText='Yes'
						closeText='No'
						close={this.toggleCloseJob}
						confirm={this.handleCloseJobPost}
						path='/employer/jobs'
					/>
				) : (
					""
				)}

				<WorkPostHeader
					name={`User: ${currentUser.First_Name} ${currentUser.Last_Name}`}
					onAdd={this.props.onAdd}
					showAdd={this.props.showAdd}
					toggle={this.props.toggle}
					currentUser={currentUser}
					resetTargetJobPost={this.props.resetTargetJobPost}
				/>

				{this.props.showAdd === false && (
					<WorkPost
						onAddPost={this.props.onAddPost}
						toggle={this.props.toggle}
						currentUser={currentUser}
						company={company}
						targetJobPost={this.props.targetJobPost}
						resetTargetJobPost={this.props.resetTargetJobPost}
						updateJobPostContent={this.props.updateJobPostContent}
					/>
				)}

				<div className='posted-jobs-container'>
					<h3 className='posted-jobs-label'>
						{companyJobPostVisible.length > 1
							? `Jobs you posted (${companyJobPostVisible.length})`
							: `Job you posted (${companyJobPostVisible.length})`}
					</h3>
					{companyJobPostVisible.map((companyJobPostVisible) => {
						return (
							<div key={companyJobPostVisible.JobID}>
								<EmpPost
									companyJobPost={companyJobPostVisible}
									currentUser={currentUser}
									deleteEmployerPost={this.props.deleteEmployerPost}
									darkTheme={this.props.darkTheme}
									toggle={this.props.toggle}
									company={company}
									setTargetJobPost={this.props.setTargetJobPost}
									numApplicants={this.props.numApplicants}
									toggleUpdateModal={this.toggleUpdateModal}
									locatePost={this.locatePost}
									isUpdateModalOpen={this.state.isUpdateModalOpen}
									updateJobPostStatus={this.props.updateJobPostStatus}
								/>
							</div>
						);
					})}

					{companyJobPostVisible.length === 0 && (
						<p
							style={{
								textAlign: "center",
								padding: "10px",
								backgroundColor: "red",
								fontSize: "12px",
								marginTop: "10px",
							}}>
							You haven't posted any job yet!
						</p>
					)}
				</div>

				{this.state.isUpdateModalOpen && (
					<div className='modal-container'>
						<div
							className='overlay-style'
							onClick={() => this.toggleUpdateModal(false)}
						/>
						<div className='modal-style'>
							<div className='modal-header'>
								<h3 className='modal-sub-text'>Update Confirmation</h3>
								<div className='modal-close'>
									<img
										className='closeIcon'
										src={CloseIcon}
										alt='Close'
										onClick={() => this.toggleUpdateModal(false)}
									/>
								</div>
							</div>
							<h1 className='modal-text'>{targetJobPost.Job_Title}</h1>
							<div className='modal-buttons'>
								<button
									className='modal-button-back'
									style={{ width: "130px" }}
									onClick={() => {
										this.toggleUpdateModal(false);
										this.setState({ isCloseIndication: true });
									}}>
									Close Job Post
								</button>
								<button
									style={{ width: "130px" }}
									className='modal-button-send'
									onClick={this.updateContent}>
									Update Content
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default withRouter(Emp_Jobs);
