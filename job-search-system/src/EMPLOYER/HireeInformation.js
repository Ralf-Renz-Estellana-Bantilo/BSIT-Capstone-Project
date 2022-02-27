import React, { Component } from "react";
import { Link } from "react-router-dom";
import LeftArrow from "../Images/LeftArrow.png";
import Modal from "../JOBSEEKER/Home-Folder/Modal";
import Resources from "../Resources";
import "./HireeInformation.css";

export class Hiree_Information extends Component {
	state = {
		isModalOpen: false,
		message: "",
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

	handleChange = async (e) => {
		await this.setState({ message: e.target.value });
	};

	handleSendRequest = async () => {
		const { message } = this.state;
		const { hiree, company } = this.props;

		const companyAddress = `${company.Street}, ${company.Zone}, ${company.Barangay}`;

		try {
			if (message !== "") {
				this.onCloseModal();

				const recruit = {
					ApplicantID: hiree.ApplicantID,
					CompanyID: company.CompanyID,
					JobID: "(n/a)",
					Company_Image: company.Company_Image,
					Company_Name: company.Company_Name,
					Job_Title: hiree.Preferred_Job,
					Company_Address: companyAddress,
					Minutes: new Date().getMinutes(),
					Hour: new Date().getHours(),
					Day: new Date().getDate(),
					Month: new Date().getMonth() + 1,
					Year: new Date().getFullYear(),
					Date_Replied: new Date(),
					Application_Status: "(n/a)",
					Status: "New",
					Type: "recruit",
					Message: this.state.message,
				};

				await this.props.addEmployerFeedBack(recruit);
			}
		} catch (error) {
			console.log(error);
		}
	};

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		const { hiree, darkTheme, employerMessage } = this.props;
		const { message } = this.state;
		const activePage = localStorage.getItem("activePage");
		const isSearchOpen = localStorage.getItem("isSearchOpen");
		const userTypeSession = sessionStorage.getItem("UserType");
		let userType = "";
		if (userTypeSession === "Job Seeker") {
			userType = "jobseeker";
		} else {
			userType = "employer";
		}

		return (
			<div className='hiree-info-container'>
				{this.state.isModalOpen ? (
					<Modal
						headText='Message Confirmation'
						modalText={`Continue sending your message to ${hiree.First_Name}?`}
						confirmText='Continue'
						closeText='Cancel'
						close={this.onCloseModal}
						confirm={this.handleSendRequest}
						path={`/${userType}/search`}
					/>
				) : (
					""
				)}
				<div
					className='back'
					style={{
						position: "absolute",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Link
						to={
							isSearchOpen === "true"
								? `/${userType}/search`
								: `/${userType}/${activePage}`
						}>
						<img
							src={LeftArrow}
							alt='Back'
							style={
								darkTheme
									? {
											filter: "brightness(1)",
											height: "25px",
											marginLeft: "10px",
									  }
									: {
											filter: "brightness(0.3)",
											height: "25px",
											marginLeft: "10px",
									  }
							}
						/>
					</Link>
				</div>

				<div className='applicant-dp'>
					<div className='applicant-profile'>
						<img
							src={`../../assets/${hiree.User_Image}`}
							alt='Applicant Profile'
							style={{ height: "150px" }}
						/>
					</div>
					<h2>{`${hiree.First_Name} ${hiree.Middle_Name} ${hiree.Last_Name}`}</h2>
					<p>
						{Resources.getCurrentAge(
							hiree.B_Month,
							hiree.B_Day,
							hiree.B_Year
						)}{" "}
						• {hiree.Sex}
					</p>
					{hiree.Hiring_Status === "Active" ? (
						<p
							style={{
								textAlign: "center",
								padding: "10px",
								color: "#131313",
								borderRadius: "5px",
								background: "linear-gradient(20deg, #00f33d, #88ff00)",
								fontSize: "14px",
								fontWeight: "600",
							}}>
							Available to hire
						</p>
					) : (
						<p
							style={{
								textAlign: "center",
								padding: "10px",
								color: "white",
								borderRadius: "5px",
								background: "linear-gradient(20deg, #ff004c, #ff7b00)",
								fontSize: "14px",
							}}>
							Not available to hire
						</p>
					)}
				</div>

				<div className='confirm-text-fields'>
					<div className='form-fields'>
						<div className='form'>
							<label>Preferred Job/s</label>
							<p>{employerMessage.Job_Title}</p>
						</div>
						<div className='form'>
							<label>Preferred Category</label>
							<p>{hiree.Preferred_Category}</p>
						</div>
					</div>
					<div className='form-fields'>
						<div className='form'>
							<label>Preferred Salary Range</label>
							<p>
								₱ {Resources.formatMoney(hiree.Minimum_Salary)} - ₱{" "}
								{Resources.formatMoney(hiree.Maximum_Salary)}
							</p>
						</div>
						<div className='form'>
							<label>Home Address</label>
							<p>{hiree.Home_Address}</p>
						</div>
					</div>
					<div className='form-fields'>
						<div className='form'>
							<label>Contact Number</label>
							<p>{hiree.Contact_Number}</p>
						</div>
						<div className='form'>
							<label>Email Address</label>
							<p>{hiree.Email_Address}</p>
						</div>
					</div>
					<div className='form-fields'>
						<div className='form'>
							<label>Birthday (mm-dd-yyyy)</label>
							<p>
								{hiree.B_Month < 10
									? `0${hiree.B_Month}`
									: hiree.B_Month}
								-{hiree.B_Day < 10 ? `0${hiree.B_Day}` : hiree.B_Day}-
								{hiree.B_Year}
							</p>
						</div>
						<div className='form'>
							<label>Civil Status</label>
							<p>{hiree.Civil_Status}</p>
						</div>
					</div>
					<div className='form-fields'>
						<div className='form'>
							<label>Disability</label>
							<p>{hiree.Disability}</p>
						</div>
						<div className='form'>
							<label>Employment Status/Type</label>
							<p>
								{hiree.Employment_Status} | {hiree.Employment_Type}
							</p>
						</div>
					</div>
					<div className='form-fields'>
						<div className='form'>
							<label>Educational Attainment</label>
							<p>{hiree.Educ_Attainment}</p>
						</div>
						<div className='form'>
							<label>Resume</label>
							{/* <p>
								{hiree.My_Resume === null
									? "No attached resume"
									: hiree.My_Resume}
							</p> */}
							{!hiree.My_Resume ? (
								<p className='resume-data'>No attached file</p>
							) : (
								<Link
									to={`/pdf/${hiree.My_Resume}`}
									target='_blank'
									download>
									{hiree.My_Resume}
								</Link>
							)}
						</div>
					</div>
					<div className='form'>
						<label>Interests</label>
						<p className='desc'>{hiree.Interested_In}</p>
					</div>
					<div className='form'>
						<label>Good At</label>
						<p className='desc'>{hiree.Good_At}</p>
					</div>
					<div className='form'>
						<label>Credentials</label>
						<p className='desc'>{hiree.Credentials}</p>
					</div>
				</div>

				<div className='action'>
					<p className='action-note'>
						Note: You are only allowed to send a message once!
					</p>
					<textarea
						placeholder='Write something...'
						rows='7'
						onChange={(e) => this.handleChange(e)}
						value={
							isSearchOpen === "true" ? message : employerMessage.Message
						}
						disabled={isSearchOpen === "false" ? "disabled" : ""}
						autoFocus
					/>
					<div className='action-buttons'>
						<button
							onClick={this.viewModal}
							disabled={
								employerMessage.Message === ""
									? "disabled"
									: message === ""
									? "disabled"
									: isSearchOpen === "false"
									? "disabled"
									: ""
							}
							style={
								employerMessage.Message === ""
									? { opacity: "0.3" }
									: message === ""
									? { opacity: "0.3" }
									: isSearchOpen === "false"
									? { opacity: "0.3" }
									: { opacity: "1" }
							}>
							{isSearchOpen === "false"
								? "Message Sent"
								: "Send Message"}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Hiree_Information;
