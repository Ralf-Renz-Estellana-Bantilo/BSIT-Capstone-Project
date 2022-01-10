import React, { Component } from "react";
import Message from "../Notification-Folder/Message";
import Activity from "./Activity";

export class Activities extends Component {
	constructor() {
		super();
		this.state = {
			feedback: {},
			isMessagePanelOpen: false,
		};
	}

	getFeedback = async (fb) => {
		await this.setState({
			feedback: fb,
			isMessagePanelOpen: true,
		});
	};

	closeMessagePanel = async () => {
		await this.setState({
			isMessagePanelOpen: false,
		});
	};

	render() {
		const { employerFeedback } = this.props;
		const { feedback, isMessagePanelOpen } = this.state;
		const applicantSession = sessionStorage.getItem("ApplicantID");

		let notificationLength = 0;

		return (
			<div className='activities-container'>
				{!isMessagePanelOpen && (
					<h3
						style={{
							padding: "0",
							margin: "0 0 10px 10px",
							fontSize: "13px",
							color: "#5a5a5a",
							fontWeight: "600",
						}}>
						{employerFeedback.map((feedback) => {
							if (
								feedback.ApplicantID === applicantSession &&
								feedback.IsDeleted === "false"
							) {
								notificationLength += 1;
							}
						})}
						Notifications ({notificationLength})
					</h3>
				)}

				{!isMessagePanelOpen ? (
					<div>
						{employerFeedback.map((feedback) => {
							if (
								feedback.ApplicantID === applicantSession &&
								feedback.IsDeleted === "false"
							) {
								return (
									<div key={feedback.FeedbackID}>
										{" "}
										<Activity
											feedback={feedback}
											getFeedback={this.getFeedback}
											deleteNotification={
												this.props.deleteNotification
											}
											darkTheme={this.props.darkTheme}
											openDeleteState={this.props.openDeleteState}
										/>
									</div>
								);
							}
						})}
					</div>
				) : (
					""
				)}

				{isMessagePanelOpen && (
					<Message
						feedback={feedback}
						closeMessagePanel={this.closeMessagePanel}
						currentUser={this.props.currentUser}
						updateNotificationStatus={this.props.updateNotificationStatus}
						setCompanyID={this.props.setCompanyID}
						activePage='notification'
						darkTheme={this.props.darkTheme}
					/>
				)}

				{notificationLength === 0 && isMessagePanelOpen === false ? (
					<p
						style={{
							textAlign: "center",
							padding: "10px",
							backgroundColor: "red",
							marginTop: "20px",
							fontSize: "12px",
						}}>
						No Available Notifications yet!
					</p>
				) : (
					""
				)}
			</div>
		);
	}
}

export default Activities;
