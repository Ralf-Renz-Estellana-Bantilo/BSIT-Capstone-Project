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

	componentDidMount = () => {
		const session = sessionStorage.getItem("UserID");

		if (!session) {
			localStorage.clear();
			this.props.history.push("/login");
		}

		localStorage.setItem("activePage", "settings");
		localStorage.setItem("isSearchOpen", false);
	};

	render() {
		const {
			currentUser,
			isSidebarOpen,
			toggleSidebar,
			company,
			getJobApplicantsByCompany,
			darkTheme,
			setTheme,
			deleteCompanyPosts,
		} = this.props;
		return (
			<div>
				<Emp_Gap />
				<Emp_Navbar
					isSidebarOpen={isSidebarOpen}
					toggleSidebar={toggleSidebar}
					currentUser={currentUser}
					company={company}
					// setCurrentUser={this.props.setCurrentUser}
					getJobApplicantsByCompany={getJobApplicantsByCompany}
					panel='Menu'
					darkTheme={darkTheme}
				/>

				{this.state.isUpdated === true && (
					<Indication
						type='primary'
						text='SUCCESSFULLY UPDATED YOUR ACCOUNT!'
						method={this.closeUpdateState}
						delay={3}
						module='employer'
					/>
				)}

				<div className='accordion'>
					<Accordion />
					<Accordion2 setTheme={setTheme} darkTheme={darkTheme} />
					<Accordion3
						deleteCompanyPosts={deleteCompanyPosts}
						currentUser={currentUser}
						setUpdated={this.setUpdated}
					/>
				</div>
			</div>
		);
	}
}

export default withRouter(Emp_Setting);
