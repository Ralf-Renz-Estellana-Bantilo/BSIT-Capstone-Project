import React, { Component } from "react";
import Emp_Navbar from "../Emp_Navbar";
import Emp_Gap from "../Emp_Gap";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Accordion from "../../JOBSEEKER/Menu-Folder/Accordion";
import Accordion2 from "../../JOBSEEKER/Menu-Folder/Accordion2";
import Accordion3 from "../../JOBSEEKER/Menu-Folder/Accordion3";

export class Emp_Setting extends Component {
	// state = {
	// 	company: [],
	// };

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
					handleLogout={this.props.handleLogout}
					currentUser={currentUser}
					company={this.props.company}
					setCurrentUser={this.props.setCurrentUser}
					getJobApplicantsByCompany={this.props.getJobApplicantsByCompany}
					panel='Settings'
					darkTheme={this.props.darkTheme}
				/>
				<div className='accordion'>
					<Accordion />
					<Accordion2
						setTheme={this.props.setTheme}
						darkTheme={this.props.darkTheme}
					/>
					<Accordion3
						deleteCompanyPosts={this.props.deleteCompanyPosts}
						infos={this.props.infos}
					/>
				</div>
			</div>
		);
	}
}

export default withRouter(Emp_Setting);
