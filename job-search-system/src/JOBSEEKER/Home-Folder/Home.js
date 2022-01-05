import React, { Component } from "react";
import Gap from "../../Gap";
import { Header } from "../../Header";
import Navbar from "../../Navbar";
import "./Home.css";
import Indication from "../../Indication";
import Feed from "./Feed";
import Footer from "./Footer";
import { withRouter } from "react-router-dom";

export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggleHasApplied: [props.hasApplied],
		};
	}

	handleChangePage = async (page) => {
		await this.props.handleChangePage(page);
	};

	closeHasApplied = () => {
		this.setState({
			toggleHasApplied: false,
		});

		this.props.closeHasApplied();
	};

	closeDeleteState = () => {
		this.props.closeDeleteState();
	};

	componentDidMount = async () => {
		await this.handleChangePage("home");

		const session = sessionStorage.getItem("UserID");
		const userType = sessionStorage.getItem("UserType");

		if (!session) {
			localStorage.clear();
			this.props.history.push("/login");
		} else if (userType === "Employer") {
			this.props.history.push("/login");
		}
	};

	componentWillUnmount() {
		this.closeHasApplied();
		this.closeDeleteState();
	}

	render() {
		return (
			<div className='home-container'>
				<Header
					userData={this.props.userData}
					currentUser={this.props.currentUser}
					history={this.props.history}
				/>
				<Navbar
					activePage='home'
					applicants={this.props.applicants}
					employerFeedback={this.props.employerFeedback}
					setEmployerFeedBack={this.props.setEmployerFeedBack}
					darkTheme={this.props.darkTheme}
				/>
				<Gap />

				{this.props.hasApplied === true && (
					<Indication
						type='primary'
						text='Your job application has been sent'
						method={this.closeHasApplied}
						delay={3}
					/>
				)}

				{this.props.isDeleted === true && (
					<Indication
						type='secondary'
						text='Post has been temporarily hidden from feed!'
						method={this.closeDeleteState}
						delay={3}
					/>
				)}

				<div className='feed'>
					{this.props.infos.length > 0 ? (
						<Feed
							onDelete={this.props.onDelete}
							infos={this.props.infos}
							scrollPosition={this.props.scrollPosition}
							handleScroll={this.props.handleScroll}
							setCompanyID={this.props.setCompanyID}
							activePage={this.props.activePage}
							applicants={this.props.applicants}
							numApplicants={this.props.numApplicants}
							darkTheme={this.props.darkTheme}
							appliedJobs={this.props.appliedJobs}
						/>
					) : (
						<p
							style={{
								textAlign: "center",
								padding: "10px",
								backgroundColor: "red",
								// marginTop: "20px",
								fontSize: "12px",
							}}>
							No Posts Available!
						</p>
					)}
				</div>
				<div className='footer'>
					<Footer />
				</div>
			</div>
		);
	}
}

export default withRouter(Home);
