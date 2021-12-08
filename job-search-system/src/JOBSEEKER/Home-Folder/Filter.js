import React, { Component } from "react";
import Resources from "../../Resources";
import "./Filter.css";

export class Filter extends Component {
	state = {
		preferredCategory: "",
	};

	handleFilterChange = async (e) => {
		await this.props.handleFilterChange(e);
	};

	handleLocationChange = async (e) => {
		await this.props.handleLocationChange(e);
	};

	componentDidMount = async () => {
		const { applicants } = this.props;
		const userSession = sessionStorage.getItem("UserID");

		for (let index = 0; index < applicants.length; index++) {
			if (applicants[index].UserID === userSession) {
				await this.setState({
					preferredCategory: applicants[index].Preferred_Category,
				});
			}
		}
	};

	render() {
		const filter = localStorage.getItem("filter");
		const location = localStorage.getItem("location");
		const sample = Resources.getBarangay();
		const { preferredCategory } = this.state;
		let barangay = sample.map((b) => {
			return (
				<option key={b} value={b}>
					{b}
				</option>
			);
		});

		return (
			<div className='filter-container'>
				<div className='filter f1'>
					<h4>Filter:</h4>
					<select
						name='Filter Posts'
						// defaultValue={`${filter}`}
						value={filter}
						className='filter-select'
						onChange={(e) => this.handleFilterChange(e)}>
						<option value='Most Recent'>Most Recent</option>
						<option value='Old Posts First'>Old Posts First</option>
						{preferredCategory && (
							<option value='Job Suggestions'>Job Suggestions</option>
						)}
					</select>
				</div>

				<div className='filter f2'>
					<h4>Location:</h4>
					<select
						defaultValue={`${location}`}
						className='filter-select'
						onChange={(e) => this.handleLocationChange(e)}>
						<option value=''>All over Catarman</option>
						{barangay}
					</select>
				</div>
			</div>
		);
	}
}

export default Filter;
