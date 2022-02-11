import React, { Component } from "react";
import Emp_Navbar from "../EmpNavbar";
import Emp_Gap from "../EmpGap";
import { withRouter } from "react-router-dom";
import Accordion from "../../JOBSEEKER/Menu-Folder/Accordion";
import Accordion2 from "../../JOBSEEKER/Menu-Folder/Accordion2";
import Accordion3 from "../../JOBSEEKER/Menu-Folder/Accordion3";
import Indication from "../../Indication";

export class Emp_Setting extends Component {
	state = {
		isUpdated: false,
	};

	setUpdated = () => {
		this.setState({ isUpdated: true });
	};

	closeUpdateState = () => {
		this.setState({ isUpdated: false });
	};

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
					// setCurrentUser={this.props.setCurrentUser}
					getJobApplicantsByCompany={this.props.getJobApplicantsByCompany}
					panel='Menu'
					darkTheme={this.props.darkTheme}
				/>

				{this.state.isUpdated === true && (
					<Indication
						type='primary'
						text='Successfully Updated your Account!'
						method={this.closeUpdateState}
						delay={3}
						module='employer'
					/>
				)}

				<div className='accordion'>
					<Accordion />
					<Accordion2
						setTheme={this.props.setTheme}
						darkTheme={this.props.darkTheme}
					/>
					<Accordion3
						deleteCompanyPosts={this.props.deleteCompanyPosts}
						currentUser={currentUser}
						setUpdated={this.setUpdated}
					/>
				</div>
			</div>
		);
	}
}

export default withRouter(Emp_Setting);
