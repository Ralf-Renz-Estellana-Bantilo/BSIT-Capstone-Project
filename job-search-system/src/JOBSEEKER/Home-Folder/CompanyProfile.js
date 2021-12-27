import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CompanyProfile.css";
import LeftArrow from "../../Images/LeftArrow.png";
import { withRouter } from "react-router-dom";
import axios from "axios";

export class CompanyProfile extends Component {
	state = {
		imageURL: "",
		employerName: "",
		companyName: "",
		contactNumber: "",
		companyAddress: "",
		description: "",
	};

	filterObject = async () => {
		await axios
			.post("http://localhost:2000/api/read-company-details", {
				companyID: this.props.targetCompany,
			})
			.then(async (response) => {
				if (response.data.length === 1) {
					await this.setState({
						imageURL: response.data[0].Company_Image,
						employerName: response.data[0].Employer_Name,
						companyName: response.data[0].Company_Name,
						contactNumber: response.data[0].Contact_Number,
						description: response.data[0].Company_Description,
						companyAddress: `${response.data[0].Street}, ${response.data[0].Zone}, ${response.data[0].Barangay}`,
					});
				} else {
					console.log("Error fetching information...");
				}
			});
	};

	componentDidMount() {
		this.filterObject();

		const session = sessionStorage.getItem("UserID");
		if (!session) {
			localStorage.clear();
			this.props.history.push("/login");
		}
	}

	render() {
		const {
			imageURL,
			employerName,
			companyName,
			contactNumber,
			description,
			companyAddress,
		} = this.state;
		const { darkTheme } = this.props;
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
					<h1>Business Details</h1>
					<div className='company-header'>
						<div className='company-logo'>
							<img src={`../../assets/${imageURL}`} alt='sample' />
						</div>
						<h3>{companyName}</h3>
					</div>

					<div className='company-details'>
						<div className='details-container'>
							<div className='detail-left'>
								<h4>Employer:</h4>
							</div>
							<div className='detail-right'>
								<p>{employerName}</p>
							</div>
						</div>
						<div className='details-container'>
							<div className='detail-left'>
								<h4>Company Address:</h4>
							</div>
							<div className='detail-right'>
								<p>{companyAddress}</p>
							</div>
						</div>
						<div className='details-container'>
							<div className='detail-left'>
								<h4>Contact Number:</h4>
							</div>
							<div className='detail-right'>
								<p>{contactNumber}</p>
							</div>
						</div>
						<div className='details-container'>
							<div className='detail-left'>
								<h4>Business Description:</h4>
							</div>
							<div className='detail-right'>
								<p>{description}</p>
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
