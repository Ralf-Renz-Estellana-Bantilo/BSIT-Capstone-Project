import React, { Component } from "react";
import EmpNavbar from "../EmpNavbar";
import EmpGap from "../EmpGap";
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
				<EmpGap />
				<EmpNavbar
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
