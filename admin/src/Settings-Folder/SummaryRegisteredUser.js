import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminResources from "../AdminResources";
import AppConfiguration from "../AppConfiguration";

const SummaryRegisteredUser = ({
	applicantsData,
	companiesData,
	summaryYear,
	handlePreviousYear,
	handleNextYear,
}) => {
	let applicantDataCopy = applicantsData.filter(
		(applicant) => applicant.Reg_Year === summaryYear
	);
	let companiesDataCopy = companiesData.filter(
		(company) => company.Reg_Year === summaryYear
	);
	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const [registeredUsers, setRegisteredUsers] = useState(null);

	useEffect(() => {
		axios.get(`${AppConfiguration.url()}/api/read-users`).then((response) => {
			if (response) {
				setRegisteredUsers(response.data);
			} else {
				console.log(`Error fetching information...`);
			}
		});
	}, []);

	const getRegisteredJobSeekerPerMonth = () => {
		let jobSeekers = [];
		for (let a = 0; a < months.length; a++) {
			let count = 0;
			for (let b = 0; b < applicantDataCopy.length; b++) {
				if (a + 1 === applicantDataCopy[b].Reg_Month) {
					count += 1;
				}
			}
			let jobSeeker = { month: months[a], count: count };
			jobSeekers.push(jobSeeker);
		}

		return jobSeekers;
	};

	const getRegisteredEmployersPerMonth = () => {
		let employers = [];
		for (let a = 0; a < months.length; a++) {
			let count = 0;
			for (let b = 0; b < companiesDataCopy.length; b++) {
				if (a + 1 === companiesDataCopy[b].Reg_Month) {
					count += 1;
				}
			}
			let employer = { month: months[a], count: count };
			employers.push(employer);
		}

		return employers;
	};

	const getRegisteredUsersPerMonth = () => {
		let users = [];
		for (let a = 0; a < months.length; a++) {
			let count = 0;
			for (let b = 0; b < companiesDataCopy.length; b++) {
				if (a + 1 === companiesDataCopy[b].Reg_Month) {
					count += 1;
				}
			}
			for (let b = 0; b < applicantDataCopy.length; b++) {
				if (a + 1 === applicantDataCopy[b].Reg_Month) {
					count += 1;
				}
			}

			let user = { month: months[a], count: count };
			users.push(user);
		}

		return users;
	};

	const getRegisteredMaleUsersPerMonth = () => {
		let users = [];

		try {
			let maleUsers = registeredUsers.filter(
				(user) => user.Sex === "Male" && user.Role !== "Admin"
			);
			for (let a = 0; a < months.length; a++) {
				let count = 0;
				for (let b = 0; b < maleUsers.length; b++) {
					for (let c = 0; c < companiesDataCopy.length; c++) {
						if (
							a + 1 === companiesDataCopy[c].Reg_Month &&
							maleUsers[b].UserID === companiesDataCopy[c].UserID
						) {
							count += 1;
						}
					}
					for (let c = 0; c < applicantDataCopy.length; c++) {
						if (
							a + 1 === applicantDataCopy[c].Reg_Month &&
							maleUsers[b].UserID === applicantDataCopy[c].UserID
						) {
							count += 1;
						}
					}
				}
				let user = { month: months[a], count: count };
				users.push(user);
			}
		} catch (error) {}

		return users;
	};

	const getRegisteredFemaleUsersPerMonth = () => {
		let users = [];

		try {
			let femaleUsers = registeredUsers.filter(
				(user) => user.Sex === "Female" && user.Role !== "Admin"
			);
			for (let a = 0; a < months.length; a++) {
				let count = 0;
				for (let b = 0; b < femaleUsers.length; b++) {
					for (let c = 0; c < companiesDataCopy.length; c++) {
						if (
							a + 1 === companiesDataCopy[c].Reg_Month &&
							femaleUsers[b].UserID === companiesDataCopy[c].UserID
						) {
							count += 1;
						}
					}
					for (let c = 0; c < applicantDataCopy.length; c++) {
						if (
							a + 1 === applicantDataCopy[c].Reg_Month &&
							femaleUsers[b].UserID === applicantDataCopy[c].UserID
						) {
							count += 1;
						}
					}
				}
				let user = { month: months[a], count: count };
				users.push(user);
			}
		} catch (error) {}

		return users;
	};

	const getCompaniesPerBarangay = () => {
		let companies = [];
		const listOfBarangay = AdminResources.getBarangay();

		for (let a = 0; a < listOfBarangay.length; a++) {
			let count = 0;
			for (let b = 0; b < companiesDataCopy.length; b++) {
				if (listOfBarangay[a] === companiesDataCopy[b].Barangay) {
					count += 1;
				}
			}
			let company = { barangay: listOfBarangay[a], count: count };
			companies.push(company);
		}

		return companies;
	};

	const getPerferredCategory = () => {
		const listOfCategories = AdminResources.getCategories();
		let applicants = [];

		for (let a = 0; a < listOfCategories.length; a++) {
			let count = 0;
			for (let b = 0; b < applicantDataCopy.length; b++) {
				if (
					listOfCategories[a] === applicantDataCopy[b].Preferred_Category
				) {
					count += 1;
				}
			}
			let applicant = { category: listOfCategories[a], count: count };
			applicants.push(applicant);
		}

		return applicants;
	};

	const listOfRegisteredJobSeekersPerMonth = getRegisteredJobSeekerPerMonth();
	let totalNumberOfJobSeeker = 0;
	let currentYear = new Date().getFullYear();
	let currentMonth = new Date().getMonth();
	let currentDay = new Date().getDate();
	let jobSeekersPerMonth = listOfRegisteredJobSeekersPerMonth.map(
		(jobSeeker, index) => {
			totalNumberOfJobSeeker += jobSeeker.count;
			if (summaryYear < currentYear) {
				return (
					<tr key={index}>
						<td>{jobSeeker.month}</td>
						<td style={{ textAlign: "center" }}>{jobSeeker.count}</td>
					</tr>
				);
			} else if (summaryYear === currentYear) {
				if (index < currentMonth) {
					return (
						<tr key={index}>
							<td>{jobSeeker.month}</td>
							<td style={{ textAlign: "center" }}>{jobSeeker.count}</td>
						</tr>
					);
				} else if (index === currentMonth) {
					return (
						<tr key={index}>
							<td>
								{jobSeeker.month} (as of{" "}
								{`${currentMonth + 1}/${currentDay}/${currentYear})`}
							</td>
							<td style={{ textAlign: "center" }}>{jobSeeker.count}</td>
						</tr>
					);
				}
			}
		}
	);

	const listOfRegisteredEmployersPerMonth = getRegisteredEmployersPerMonth();
	let totalNumberOfEmployers = 0;
	let employersPerMonth = listOfRegisteredEmployersPerMonth.map(
		(employer, index) => {
			totalNumberOfEmployers += employer.count;
			if (summaryYear < currentYear) {
				return (
					<tr key={index}>
						<td>{employer.month}</td>
						<td style={{ textAlign: "center" }}>{employer.count}</td>
					</tr>
				);
			} else if (summaryYear === currentYear) {
				if (index < currentMonth) {
					return (
						<tr key={index}>
							<td>{employer.month}</td>
							<td style={{ textAlign: "center" }}>{employer.count}</td>
						</tr>
					);
				} else if (index === currentMonth) {
					return (
						<tr key={index}>
							<td>
								{employer.month} (as of{" "}
								{`${currentMonth + 1}/${currentDay}/${currentYear})`}
							</td>
							<td style={{ textAlign: "center" }}>{employer.count}</td>
						</tr>
					);
				}
			}
		}
	);

	const listOfRegisteredUsersPerMonth = getRegisteredUsersPerMonth();
	let totalNumberOfUsers = 0;
	let usersPerMonth = listOfRegisteredUsersPerMonth.map((user, index) => {
		totalNumberOfUsers += user.count;
		if (summaryYear < currentYear) {
			return (
				<tr key={index}>
					<td>{user.month}</td>
					<td style={{ textAlign: "center" }}>{user.count}</td>
				</tr>
			);
		} else if (summaryYear === currentYear) {
			if (index < currentMonth) {
				return (
					<tr key={index}>
						<td>{user.month}</td>
						<td style={{ textAlign: "center" }}>{user.count}</td>
					</tr>
				);
			} else if (index === currentMonth) {
				return (
					<tr key={index}>
						<td>
							{user.month} (as of{" "}
							{`${currentMonth + 1}/${currentDay}/${currentYear})`}
						</td>
						<td style={{ textAlign: "center" }}>{user.count}</td>
					</tr>
				);
			}
		}
	});

	const listOfRegisteredMaleUsersPerMonth = getRegisteredMaleUsersPerMonth();
	let totalNumberOfMaleUsers = 0;
	let maleUsersPerMonth = listOfRegisteredMaleUsersPerMonth.map(
		(user, index) => {
			totalNumberOfMaleUsers += user.count;
			if (summaryYear < currentYear) {
				return (
					<tr key={index}>
						<td>{user.month}</td>
						<td style={{ textAlign: "center" }}>{user.count}</td>
					</tr>
				);
			} else if (summaryYear === currentYear) {
				if (index < currentMonth) {
					return (
						<tr key={index}>
							<td>{user.month}</td>
							<td style={{ textAlign: "center" }}>{user.count}</td>
						</tr>
					);
				} else if (index === currentMonth) {
					return (
						<tr key={index}>
							<td>
								{user.month} (as of{" "}
								{`${currentMonth + 1}/${currentDay}/${currentYear})`}
							</td>
							<td style={{ textAlign: "center" }}>{user.count}</td>
						</tr>
					);
				}
			}
		}
	);

	const listOfRegisteredFemaleUsersPerMonth =
		getRegisteredFemaleUsersPerMonth();
	let totalNumberOfFemaleUsers = 0;
	let femaleUsersPerMonth = listOfRegisteredFemaleUsersPerMonth.map(
		(user, index) => {
			totalNumberOfFemaleUsers += user.count;
			if (summaryYear < currentYear) {
				return (
					<tr key={index}>
						<td>{user.month}</td>
						<td style={{ textAlign: "center" }}>{user.count}</td>
					</tr>
				);
			} else if (summaryYear === currentYear) {
				if (index < currentMonth) {
					return (
						<tr key={index}>
							<td>{user.month}</td>
							<td style={{ textAlign: "center" }}>{user.count}</td>
						</tr>
					);
				} else if (index === currentMonth) {
					return (
						<tr key={index}>
							<td>
								{user.month} (as of{" "}
								{`${currentMonth + 1}/${currentDay}/${currentYear})`}
							</td>
							<td style={{ textAlign: "center" }}>{user.count}</td>
						</tr>
					);
				}
			}
		}
	);

	const listOfCompaniesPerBarangay = getCompaniesPerBarangay().sort(
		(a, b) => b.count - a.count
	);
	let totalNumberOfCompanies = 0;
	let companiesPerBarangay = listOfCompaniesPerBarangay.map(
		(company, index) => {
			totalNumberOfCompanies += company.count;
			return (
				<tr key={index}>
					<td>{company.barangay}</td>
					<td style={{ textAlign: "center" }}>{company.count}</td>
				</tr>
			);
		}
	);

	const listOfPreferredCategory = getPerferredCategory().sort(
		(a, b) => b.count - a.count
	);
	let totalNumberOfPreferredCategory = 0;
	let preferredCategory = listOfPreferredCategory.map((category, index) => {
		totalNumberOfPreferredCategory += category.count;
		return (
			<tr key={index}>
				<td>{category.category}</td>
				<td style={{ textAlign: "center" }}>{category.count}</td>
			</tr>
		);
	});

	return (
		<div className='summary-container'>
			<div className='summary'>
				<div className='summary-header'>
					<h4>REGISTERED JOB SEEKERS PER MONTH</h4>
				</div>
				<div className='summary-content'>
					<table>
						<tr>
							<th className='summary-month'>Month</th>
							<th className='summary-number'>No. of Job Seekers</th>
						</tr>
						{jobSeekersPerMonth}
						<tr>
							<td className='summary-total'>TOTAL</td>
							<td className='summary-value'>{totalNumberOfJobSeeker}</td>
						</tr>
					</table>
				</div>
			</div>
			<div className='summary'>
				<div className='summary-header'>
					<h4>REGISTERED EMPLOYERS PER MONTH</h4>
				</div>
				<div className='summary-content'>
					<table>
						<tr>
							<th className='summary-month'>Month</th>
							<th className='summary-number'>No. of Employers</th>
						</tr>
						{employersPerMonth}
						<tr>
							<td className='summary-total'>TOTAL</td>
							<td className='summary-value'>{totalNumberOfEmployers}</td>
						</tr>
					</table>
				</div>
			</div>
			<div className='summary'>
				<div className='summary-header'>
					<h4>TOTAL REGISTERED USER PER MONTH</h4>
				</div>
				<div className='summary-content'>
					<table>
						<tr>
							<th className='summary-month'>Month</th>
							<th className='summary-number'>No. of Users</th>
						</tr>
						{usersPerMonth}
						<tr>
							<td className='summary-total'>TOTAL</td>
							<td className='summary-value'>{totalNumberOfUsers}</td>
						</tr>
					</table>
				</div>
			</div>
			<div className='summary'>
				<div className='summary-header'>
					<h4>TOTAL REGISTERED MALE USER PER MONTH</h4>
				</div>
				<div className='summary-content'>
					<table>
						<tr>
							<th className='summary-month'>Month</th>
							<th className='summary-number'>No. of Male Users</th>
						</tr>
						{maleUsersPerMonth}
						<tr>
							<td className='summary-total'>TOTAL</td>
							<td className='summary-value'>{totalNumberOfMaleUsers}</td>
						</tr>
					</table>
				</div>
			</div>
			<div className='summary'>
				<div className='summary-header'>
					<h4>TOTAL REGISTERED FEMALE USER PER MONTH</h4>
				</div>
				<div className='summary-content'>
					<table>
						<tr>
							<th className='summary-month'>Month</th>
							<th className='summary-number'>No. of Female Users</th>
						</tr>
						{femaleUsersPerMonth}
						<tr>
							<td className='summary-total'>TOTAL</td>
							<td className='summary-value'>
								{totalNumberOfFemaleUsers}
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div className='summary'>
				<div className='summary-header'>
					<h4>REGISTERED COMPANY PER BARANGAY</h4>
				</div>
				<div className='summary-content'>
					<table>
						<tr>
							<th>Barangay</th>
							<th>No. of Companies</th>
						</tr>
						{companiesPerBarangay}
						<tr>
							<td className='summary-total'>TOTAL</td>
							<td className='summary-value'>{totalNumberOfCompanies}</td>
						</tr>
					</table>
				</div>
			</div>
			<div className='summary'>
				<div className='summary-header'>
					<h4>JOB SEEKER'S PREFERRED JOB CATEGORY</h4>
				</div>
				<div className='summary-content'>
					<table>
						<tr>
							<th>Category</th>
							<th>No. of Job Seekers</th>
						</tr>
						{preferredCategory}
						<tr>
							<td className='summary-total'>TOTAL</td>
							<td className='summary-value'>
								{totalNumberOfPreferredCategory}
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div className='summary-duration'>
				<button
					onClick={handlePreviousYear}
					disabled={summaryYear <= 2021 && "disabled"}
					title='Previous Year'>
					{" "}
					-{" "}
				</button>
				<p>{summaryYear}</p>
				<button
					onClick={handleNextYear}
					disabled={currentYear <= summaryYear && "disabled"}
					title='Next Year'>
					{" "}
					+{" "}
				</button>
			</div>
		</div>
	);
};

export default SummaryRegisteredUser;
