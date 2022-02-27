import React, { Component } from "react";
import Accordion from "./Accordion";
import Accordion2 from "./Accordion2";
import Accordion3 from "./Accordion3";
import Footer from "../Home-Folder/Footer";
import "./Menu.css";
import Navbar from "../../Navbar";
import Gap from "../../Gap";
import Header from "../../Header";
import Modal from "../Home-Folder/Modal";
import { withRouter } from "react-router-dom";
import Auth from "../../Auth";
import Indication from "../../Indication";

export class Menu extends Component {
	state = {
		isModalOpen: false,
		isUpdated: false,
	};

	setUpdated = () => {
		this.setState({ isUpdated: true });
	};

	closeUpdateState = () => {
		this.setState({ isUpdated: false });
	};

	viewModal = () => {
		this.setState({
			isModalOpen: true,
		});
	};

	onCloseModal = () => {
		this.setState({
			isModalOpen: false,
		});
	};

	handleLogout = (e) => {
		e.preventDefault();

		// console.log("User has been logged out!");
		localStorage.clear();
		Auth.setNotAuthenticated();
		this.props.resetScroll();
	};

	handleChangePage = async (page) => {
		await this.props.handleChangePage(page);
	};

	componentDidMount = async () => {
		await this.handleChangePage("menu");

		const session = sessionStorage.getItem("UserID");
		if (!session) {
			localStorage.clear();
			this.props.history.push("/login");
		}
	};

	render() {
		const { First_Name } = this.props.currentUser;

		return (
			<div className='menu-container'>
				<Header
					currentUser={this.props.currentUser}
					history={this.props.history}
				/>
				<Navbar
					activePage='menu'
					applicants={this.props.applicants}
					employerFeedback={this.props.employerFeedback}
					setEmployerFeedBack={this.props.setEmployerFeedBack}
					darkTheme={this.props.darkTheme}
				/>
				<Gap />

				{this.state.isUpdated === true && (
					<Indication
						type='primary'
						text='SUCCESSFULLY UPDATED YOUR ACCOUNT!'
						method={this.closeUpdateState}
						delay={3}
					/>
				)}

				<h1
					style={{
						padding: "0",
						margin: "0 0 5px 0",
						fontSize: "13px",
						color: "#5a5a5a",
						fontWeight: "600",
					}}>
					Menu
				</h1>

				<div className='menu-content-panel'>
					<div className='menu-main-panel'>
						<div className='accordion'>
							<Accordion />
							<Accordion2
								setTheme={this.props.setTheme}
								darkTheme={this.props.darkTheme}
							/>
							<Accordion3
								currentUser={this.props.currentUser}
								setUpdated={this.setUpdated}
							/>
						</div>
					</div>

					<div className='bottom-container'>
						<button className='logoutButton' onClick={this.viewModal}>
							Logout
						</button>

						{this.state.isModalOpen ? (
							<Modal
								headText='Logout Confirmation'
								modalText={`Hey ${First_Name}, are you sure you want to logout?`}
								confirmText='Logout'
								closeText='Cancel'
								close={this.onCloseModal}
								confirm={this.handleLogout}
								path='/login'
							/>
						) : (
							""
						)}

						<Footer />
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Menu);
