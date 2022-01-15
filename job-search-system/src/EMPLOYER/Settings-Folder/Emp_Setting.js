import React, { Component } from "react";
import Emp_Navbar from "../Emp_Navbar";
import Emp_Gap from "../Emp_Gap";
import { withRouter } from "react-router-dom";
import Accordion from "../../JOBSEEKER/Menu-Folder/Accordion";
import Accordion2 from "../../JOBSEEKER/Menu-Folder/Accordion2";
import Accordion3 from "../../JOBSEEKER/Menu-Folder/Accordion3";

export class Emp_Setting extends Component {
	componentDidMount = async () => {
		const session = sessionStorage.getItem("UserID");

		if (!session) {
			localStorage.clear();
			this.props.history.push("/login");
		}

		localStorage.setItem("activePage", "settings");
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
					panel='Menu'
					darkTheme={this.props.darkTheme}
				/>
				<div className='accordion'>
					<Accordion />
					<Accordion2
						setTheme={this.props.setTheme}
						darkTheme={this.props.darkTheme}
					/>
					<Accordion3 deleteCompanyPosts={this.props.deleteCompanyPosts} />
				</div>
			</div>
		);
	}
}

export default withRouter(Emp_Setting);
