import React, { Component } from "react";
import Emp_Navbar from "../Emp_Navbar";
import Emp_Gap from "../Emp_Gap";
import axios from "axios";
import { withRouter } from "react-router-dom";

export class Emp_Account extends Component {
	state = {
		company: [],
	};

	componentDidMount = async () => {
		// Fetching Company Data
		// await axios
		// 	.post("http://localhost:2000/api/read-company", {
		// 		userID: this.props.currentUser.UserID,
		// 	})
		// 	.then(async (response) => {
		// 		if (response.data.length === 1) {
		// 			await this.setState({
		// 				company: response.data[0],
		// 			});
		// 		} else {
		// 			console.log("Error fetching information...");
		// 		}
		// 	});

		const session = sessionStorage.getItem("UserID");

		if (!session) {
			localStorage.clear();
			this.props.history.push("/login");
		}

		localStorage.setItem("activePage", "account");
		localStorage.setItem("isSearchOpen", false);
	};
	render() {
		const { currentUser } = this.props;
		return (
			<div>
				<Emp_Gap />
				<Emp_Navbar
					isSidebarOpen={this.props.isSidebarOpen}
					toggleSidebar={this.props.toggleSidebar}
					handleLogout={this.props.handleLogout}
					currentUser={currentUser}
					company={this.props.company}
					setCurrentUser={this.props.setCurrentUser}
					getJobApplicantsByCompany={this.props.getJobApplicantsByCompany}
					panel='Account'
					darkTheme={this.props.darkTheme}
				/>
				Account Page
			</div>
		);
	}
}

export default withRouter(Emp_Account);
