import React, { Component } from "react";
import Bell from "../../Images/Bell.png";
import Warning from "../../Images/Warning.png";
import DeleteIcon from "../../Images/DeleteIcon.png";
import LocationIcon from "../../Images/LocationIcon.png";
import "./Activity.css";
import TimeStamp from "../../TimeStamp";
import Modal from "../Home-Folder/Modal";

export class Activity extends Component {
	state = {
		isModalOpen: false,
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

	handleFeedback = () => {
		this.props.getFeedback(this.props.feedback);
	};

	handleDeleteNotification = () => {
		const { feedback } = this.props;
		this.props.deleteNotification(feedback.FeedbackID);
		this.onCloseModal();
	};

	render() {
		const { feedback, darkTheme } = this.props;
		return (
			<div>
				{this.state.isModalOpen ? (
					<Modal
						headText='Delete Confirmation'
						modalText={`Continue deleting this notification?`}
						closeText='Cancel'
						confirmText='Continue'
						close={this.onCloseModal}
						confirm={this.handleDeleteNotification}
						path='/jobseeker/notification'
					/>
				) : (
					""
				)}

				<div
					className={
						feedback.Status === "New"
							? "activity-container-new"
							: "activity-container"
					}>
					<div className='activity-left-panel'>
						<div
							className='activity-left-panel-img-container'
							onClick={this.handleFeedback}>
							<div className='activity-left-panel-img-main'>
								<img
									src={`../assets/${feedback.Company_Image}`}
									alt='company'
								/>
							</div>
							<div
								className={
									feedback.Type === "feedback"
										? "activity-left-panel-img-support"
										: "activity-left-panel-img-support-warning"
								}>
								<img
									src={feedback.Type === "feedback" ? Bell : Warning}
									alt=''
								/>
							</div>
						</div>
					</div>
					<div
						className='activity-main-panel'
						onClick={this.handleFeedback}>
						<div className='activity-main-panel-content'>
							{feedback.Type === "feedback" ? (
								<h4>
									<strong>{feedback.Company_Name}</strong> responded on
									your job application as{" "}
									<span>{feedback.Job_Title}.</span>
								</h4>
							) : (
								<h4>
									<strong>{feedback.Company_Name}</strong> is
									interested on hiring you as{" "}
									<span>{feedback.Job_Title}</span>
								</h4>
							)}

							<div className='activity-main-panel-content-info'>
								<p>
									{TimeStamp.setTimeStamp(
										feedback.Minutes,
										feedback.Hour,
										feedback.Day,
										feedback.Month,
										feedback.Year
									)}
								</p>
								<div className='activity-main-panel-content-info-address'>
									<img
										src={LocationIcon}
										alt=''
										style={
											darkTheme
												? { filter: "brightness(1)" }
												: { filter: "brightness(0.1)" }
										}
									/>
									<p>{feedback.Company_Address}</p>
								</div>
							</div>
						</div>
					</div>
					<div className='activity-right-panel' onClick={this.viewModal}>
						{feedback.Status === "New" ? (
							""
						) : (
							<img
								src={DeleteIcon}
								alt='Delete'
								style={
									darkTheme
										? { filter: "brightness(1)" }
										: { filter: "brightness(0.1)" }
								}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
}

Activity.defaultProps = {
	status: "old",
	type: "job",
};

export default Activity;
