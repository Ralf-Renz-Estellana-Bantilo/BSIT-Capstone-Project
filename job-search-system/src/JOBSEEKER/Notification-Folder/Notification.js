import React, { Component } from "react";
import Gap from "../../Gap";
import { Header } from "../../Header";
import Navbar from "../../Navbar";
import { withRouter } from "react-router-dom";
import Activities from "../Profile-Folder/Activities";

export class Notification extends Component {
	handleChangePage = async (page) => {
		await this.props.handleChangePage(page);
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
					badge={this.props.badge}
					employerFeedback={this.props.employerFeedback}
					darkTheme={this.props.darkTheme}
				/>
				<Gap />

				<Activities
					employerFeedback={this.props.employerFeedback}
					currentUser={this.props.currentUser}
					updateNotificationStatus={this.props.updateNotificationStatus}
					deleteNotification={this.props.deleteNotification}
					setEmployerFeedBack={this.props.setEmployerFeedBack}
					setCompanyID={this.props.setCompanyID}
					darkTheme={this.props.darkTheme}
					activePage='notification'
				/>

				{this.props.employerFeedback.length === 0 ? (
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

export default withRouter(Notification);
