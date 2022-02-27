import React from "react";
import AdminResources from "../AdminResources";

const SummaryJobCategories = ({ jobPosts }) => {
	const getVacancyCountPerCategory = () => {
		const listOfCategories = AdminResources.getCategories();
		let posts = [];

		for (let a = 0; a < listOfCategories.length; a++) {
			let count = 0;
			for (let b = 0; b < jobPosts.length; b++) {
				// if (jobPosts[b].Active_Status === "Active") {
				if (listOfCategories[a] === jobPosts[b].Category) {
					count += Number(jobPosts[b].Required_Employees);
				}
				// }
			}
			let post = { category: listOfCategories[a], count: count };
			posts.push(post);
		}

		return posts;
	};

	const listOfCategories = getVacancyCountPerCategory().sort(
		(a, b) => b.count - a.count
	);

	let vacancyCountPerCategory = listOfCategories.map((category, index) => {
		return (
			<tr key={index}>
				<td>{category.category}</td>
				<td style={{ textAlign: "center" }}>{category.count}</td>
			</tr>
		);
	});
	let totalVacancyCount = 0;
	for (let a = 0; a < listOfCategories.length; a++) {
		totalVacancyCount += listOfCategories[a].count;
	}
	return (
		<div className='summary-container'>
			<div className='summary'>
				<div className='summary-header'>
					<h4>VACANCY COUNT PER JOB CATEGORY</h4>
				</div>
				<div className='summary-content'>
					<table>
						<tr>
							<th>Category</th>
							<th>Vacancy Count</th>
						</tr>
						{vacancyCountPerCategory}
						<tr>
							<td className='summary-total'>TOTAL</td>
							<td className='summary-value'>{totalVacancyCount}</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	);
};

export default SummaryJobCategories;
