import axios from "axios";

class Auth {
	constructor() {
		this.authenticated = false;
	}

	login(callBack) {
		this.authenticated = true;
		callBack();
	}

	logout(callBack) {
		this.authenticated = false;
		callBack();
	}

	setNotAuthenticated = () => {
		this.authenticated = false;
		sessionStorage.clear();
	};

	setAuthenticated = async (id) => {
		this.authenticated = true;
		sessionStorage.setItem("UserID", id);

		// Fetching Job Applicant ID of the Current User
		await axios
			.post(
				"https://job-search-system-catarman.herokuapp.com/api/get-applicantID",
				{
					userID: id,
				}
			)
			.then(async (response) => {
				if (response.data.length === 1) {
					sessionStorage.setItem(
						"ApplicantID",
						response.data[0].ApplicantID
					);
					localStorage.setItem("filter", "Most Recent");
					localStorage.setItem("location", "");
				}
			});

		// Fetching Job Applicant ID of the Current User
		await axios
			.post(
				"https://job-search-system-catarman.herokuapp.com/api/get-companyID",
				{
					userID: id,
				}
			)
			.then(async (response) => {
				if (response.data.length === 1) {
					sessionStorage.setItem("CompanyID", response.data[0].CompanyID);
				}
			});
	};

	setUserType = (userType) => {
		sessionStorage.setItem("UserType", userType);
	};

	isAuthenticated() {
		return this.authenticated;
	}
}

export default new Auth();
