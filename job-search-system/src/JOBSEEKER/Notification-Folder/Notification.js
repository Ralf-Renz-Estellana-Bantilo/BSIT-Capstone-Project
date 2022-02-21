import React, { Component } from "react";
import Gap from "../../Gap";
import { Header } from "../../Header";
import Navbar from "../../Navbar";
import { withRouter } from "react-router-dom";
import Activities from "../Profile-Folder/Activities";
import Indication from "../../Indication";

export class Notification extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDeleted: false,
		};
	}

	handleChangePage = async (page) => {
		await this.props.handleChangePage(page);
	};

	openDeleteState = () => {
		this.setState({ isDeleted: true });
	};

	closeDeleteState = () => {
		this.setState({ isDeleted: false });
	};

	componentDidMount = async () => {
		await this.handleChangePage("notification");

		const session = sessionStorage.getItem("UserID");
		if (!session) {
			localStorage.clear();
			this.props.history.push("/login");
		}
	};

	render() {
		return (
			<div
				className='notification-container'
				style={{ textAlign: "center" }}>
				<Header
					currentUser={this.props.currentUser}
					history={this.props.history}
				/>
				<Navbar
					activePage='notification'
					applicants={this.props.applicants}
					employerFeedback={this.props.employerFeedback}
					darkTheme={this.props.darkTheme}
				/>
				<Gap />

				{this.state.isDeleted === true && (
					<Indication
						type='secondary'
						text='NOTIFICATION HAS BEEN DELETED!'
						method={this.closeDeleteState}
						delay={3}
					/>
				)}

				<Activities
					employerFeedback={this.props.employerFeedback}
					currentUser={this.props.currentUser}
					updateNotificationStatus={this.props.updateNotificationStatus}
					deleteNotification={this.props.deleteNotification}
					setEmployerFeedBack={this.props.setEmployerFeedBack}
					setCompanyID={this.props.setCompanyID}
					darkTheme={this.props.darkTheme}
					activePage='notification'
					openDeleteState={this.openDeleteState}
				/>
			</div>
		);
	}
}

export default withRouter(Notification);
