import React, { Component } from "react";
import Emp_Navbar from "../Emp_Navbar";
import Emp_Gap from "../Emp_Gap";
import { withRouter } from "react-router-dom";

export class Emp_Account extends Component {
	state = {
		company: [],
	};

	componentDidMount = async () => {
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
