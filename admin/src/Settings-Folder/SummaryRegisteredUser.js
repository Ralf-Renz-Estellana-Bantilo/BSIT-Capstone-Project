import React from "react";
import AdminResources from "../AdminResources";

const SummaryRegisteredUser = ({ applicantsData, companiesData }) => {
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

	const getRegisteredJobSeekerPerMonth = () => {
		let jobSeekers = [];
		for (let a = 0; a < months.length; a++) {
			let count = 0;
			for (let b = 0; b < applicantsData.length; b++) {
				if (a + 1 === applicantsData[b].Reg_Month) {
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
			for (let b = 0; b < companiesData.length; b++) {
				if (a + 1 === companiesData[b].Reg_Month) {
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
			for (let b = 0; b < companiesData.length; b++) {
				if (a + 1 === companiesData[b].Reg_Month) {
					count += 1;
				}
			}
			for (let b = 0; b < applicantsData.length; b++) {
				if (a + 1 === applicantsData[b].Reg_Month) {
					count += 1;
				}
			}

			let user = { month: months[a], count: count };
			users.push(user);
		}

		return users;
	};

	const getCompaniesPerBarangay = () => {
		let companies = [];
		const listOfBarangay = AdminResources.getBarangay();

		for (let a = 0; a < listOfBarangay.length; a++) {
			let count = 0;
			for (let b = 0; b < companiesData.length; b++) {
				if (listOfBarangay[a] === companiesData[b].Barangay) {
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
			for (let b = 0; b < applicantsData.length; b++) {
				if (listOfCategories[a] === applicantsData[b].Preferred_Category) {
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
	let currentMonth = new Date().getMonth();
	let jobSeekersPerMonth = listOfRegisteredJobSeekersPerMonth.map(
		(jobSeeker, index) => {
			totalNumberOfJobSeeker += jobSeeker.count;
			if (index <= currentMonth) {
				return (
					<tr key={index}>
						<td>{jobSeeker.month}</td>
						<td style={{ textAlign: "center" }}>{jobSeeker.count}</td>
					</tr>
				);
			}
		}
	);

	const listOfRegisteredEmployersPerMonth = getRegisteredEmployersPerMonth();
	let totalNumberOfEmployers = 0;
	let employersPerMonth = listOfRegisteredEmployersPerMonth.map(
		(employer, index) => {
			totalNumberOfEmployers += employer.count;
			if (index <= currentMonth) {
				return (
					<tr key={index}>
						<td>{employer.month}</td>
						<td style={{ textAlign: "center" }}>{employer.count}</td>
					</tr>
				);
			}
		}
	);

	const listOfRegisteredUsersPerMonth = getRegisteredUsersPerMonth();
	let totalNumberOfUsers = 0;
	let usersPerMonth = listOfRegisteredUsersPerMonth.map((user, index) => {
		totalNumberOfUsers += user.count;
		if (index <= currentMonth) {
			return (
				<tr key={index}>
					<td>{user.month}</td>
					<td style={{ textAlign: "center" }}>{user.count}</td>
				</tr>
			);
		}
	});

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
		</div>
	);
};

export default SummaryRegisteredUser;
