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
						Notifications ({employerFeedback.length})
					</h3>
				)}

				{!isMessagePanelOpen ? (
					<div>
						{employerFeedback.map((feedback) => {
							if (feedback.ApplicantID === applicantSession) {
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
				{/* */}

				{/* <Activity status='new' />
				<Activity />
				<Activity status='new' />
				<Activity status='new' type='hire' />
				<Activity type='hire' />
				<Activity status='new' /> */}
			</div>
		);
	}
}

export default Activities;
