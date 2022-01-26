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
export class Emp_Jobs extends Component {
	constructor() {
		super();
		this.state = {
			isUpdateModalOpen: false,
			targetJobPost: [],
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

	render() {
		const { currentUser, companyJobPost, company } = this.props;

		const { targetJobPost } = this.state;

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
						text='Post has been deleted!'
						method={this.props.closeDeleteState}
						delay={3}
						module='employer'
					/>
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
						{companyJobPost.length > 1
							? `Jobs you posted (${companyJobPost.length})`
							: `Job you posted (${companyJobPost.length})`}
					</h3>
					{companyJobPost.map((companyJobPost) => {
						return (
							<div key={companyJobPost.JobID}>
								<EmpPost
									companyJobPost={companyJobPost}
									currentUser={currentUser}
									deleteEmployerPost={this.props.deleteEmployerPost}
									darkTheme={this.props.darkTheme}
									toggle={this.props.toggle}
									setTargetJobPost={this.props.setTargetJobPost}
									toggleUpdateModal={this.toggleUpdateModal}
									locatePost={this.locatePost}
									isUpdateModalOpen={this.state.isUpdateModalOpen}
									updateJobPostStatus={this.props.updateJobPostStatus}
								/>
							</div>
						);
					})}

					{companyJobPost.length === 0 && (
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
						<div className='overlay-style' />
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
									onClick={() =>
										this.props.updateJobPostStatus(
											targetJobPost.JobID
										)
									}>
									Close Job Post
								</button>
								<button
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
