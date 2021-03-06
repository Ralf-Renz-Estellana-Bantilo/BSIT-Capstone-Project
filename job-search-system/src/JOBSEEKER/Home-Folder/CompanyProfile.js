import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CompanyProfile.css";
import LeftArrow from "../../Images/LeftArrow.png";
import { withRouter } from "react-router-dom";
import axios from "axios";
import AppConfiguration from "../../AppConfiguration";

export class CompanyProfile extends Component {
	state = {
		company: [],
		companyAddress: "",
	};

	filterObject = async () => {
		await axios
			.post(`${AppConfiguration.url()}/api/read-company-details`, {
				companyID: this.props.targetCompany,
			})
			.then((response) => {
				if (response.data.length === 1) {
					this.setState({
						company: response.data[0],
						companyAddress: `${response.data[0].Street}, ${response.data[0].Zone}, ${response.data[0].Barangay}`,
					});
				} else {
					console.log("Error fetching information...");
				}
			});
	};

	componentDidMount = async () => {
		await this.filterObject();
		const { company } = this.state;
		const { activePage } = this.props;

		const session = sessionStorage.getItem("UserID");
		if (!session) {
			localStorage.clear();
			this.props.history.push("/login");
		}

		if (!company.CompanyID) {
			this.props.history.push(`/jobseeker/${activePage}`);
		}
	};

	formatCompanyAddress = () => {
		const { companyAddress } = this.state;
		let place = `${companyAddress}`.split(", ");
		let formattedPlace = "";

		if (place.length === 1) {
			formattedPlace = companyAddress;
		} else {
			if (place[0] === "" && place[1] !== "Not Specified") {
				formattedPlace = place[1] + ", " + place[2];
			} else if (place[0] !== "" && place[1] === "Not Specified") {
				formattedPlace = place[0] + ", " + place[2];
			} else if (place[0] === "" && place[1] === "Not Specified") {
				formattedPlace = place[2];
			} else {
				formattedPlace = companyAddress;
			}
		}

		return formattedPlace;
	};

	render() {
		const { company } = this.state;
		const { darkTheme } = this.props;

		const companyAddress = this.formatCompanyAddress();
		return (
			<div className='company-profile-container'>
				<Link to={`/jobseeker/${this.props.activePage}`}>
					<div className='back-icon-container'>
						<img
							src={LeftArrow}
							alt='back'
							title='Go Back'
							className='back-icon'
							style={
								darkTheme
									? { filter: "brightness(1)" }
									: { filter: "brightness(0.3)" }
							}
						/>
					</div>
				</Link>

				<div className='company-profile-content'>
					<h1>BUSINESS ESTABLISHMENT DETAILS</h1>
					<div className='company-header'>
						<div className='company-logo'>
							<img
								src={company.Company_Image}
								// src={`${AppConfiguration.url()}/assets/images/${
								// 	company.Company_Image
								// }`}
								alt='Company Photo'
							/>
						</div>
						<h3>{company.Company_Name}</h3>
					</div>

					<div className='company-details'>
						{/* <div className='details-container'>
							<div className='detail-left'>
								<h4>Employer:</h4>
							</div>
							<div className='detail-right'>
								<p>{company.Employer_Name}</p>
							</div>
						</div> */}
						<div className='details-container'>
							<div className='detail-left'>
								<h4>Company Address:</h4>
							</div>
							<div className='detail-right'>
								<p>{companyAddress}, Catarman, N. Samar</p>
							</div>
						</div>
						{company.Company_Acronym !== "(n/a)" && (
							<div className='details-container'>
								<div className='detail-left'>
									<h4>Acronym/Abbreviation:</h4>
								</div>
								<div className='detail-right'>
									<p>{company.Company_Acronym}</p>
								</div>
							</div>
						)}

						<div className='details-container'>
							<div className='detail-left'>
								<h4>Employer Type:</h4>
							</div>
							<div className='detail-right'>
								<p>{company.Employer_Type}</p>
							</div>
						</div>
						<div className='details-container'>
							<div className='detail-left'>
								<h4>Total Work Force:</h4>
							</div>
							<div className='detail-right'>
								<p>{company.Work_Force}</p>
							</div>
						</div>
						<div className='details-container'>
							<div className='detail-left'>
								<h4>Contact Number:</h4>
							</div>
							<div className='detail-right'>
								<p>{company.Contact_Number}</p>
							</div>
						</div>
						<div className='details-container'>
							<div className='detail-left'>
								<h4>Email Address:</h4>
							</div>
							<div className='detail-right'>
								<p>{company.Email_Address}</p>
							</div>
						</div>
						<div className='details-container'>
							<div className='detail-left'>
								<h4>Business Description:</h4>
							</div>
							<div
								className='detail-right'
								style={{ textAlign: "justify" }}>
								<p>{company.Company_Description}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CompanyProfile.defaultProps = {
	prevPath: "/home",
};

export default withRouter(CompanyProfile);
