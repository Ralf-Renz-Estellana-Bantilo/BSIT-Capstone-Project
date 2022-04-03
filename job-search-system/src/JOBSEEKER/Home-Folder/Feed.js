import React, { Component } from "react";
import Post from "./Post";
import "./Feed.css";
import Filter from "./Filter";
import TimeStamp from "../../TimeStamp";

export class Feed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			togglePanel: [true],
			filter: null,
			location: null,
			preferredCategory: "",
		};
	}

	deletePost = (id) => {
		this.props.onDelete(id);
	};

	toggleCompanyProfile = () => {
		this.setState({
			togglePanel: !this.state.togglePanel,
		});
	};

	handleFilterChange = async (e) => {
		localStorage.setItem("filter", e.target.value);
		await this.setState({ filter: e.target.value });
	};

	handleLocationChange = async (e) => {
		localStorage.setItem("location", e.target.value);
		await this.setState({ location: e.target.value });
	};

	componentDidMount = async () => {
		const scrollData = localStorage.getItem("scroll");
		const userSession = sessionStorage.getItem("UserID");

		const { applicants } = this.props;
		for (let index = 0; index < applicants.length; index++) {
			if (applicants[index].UserID === userSession) {
				await this.setState({
					preferredCategory: applicants[index].Preferred_Category,
				});
			}
		}

		this.setState({
			filter: localStorage.getItem("filter"),
			location: localStorage.getItem("location"),
		});

		window.scrollTo(0, scrollData);
	};

	componentWillUnmount() {
		localStorage.setItem("scroll", window.pageYOffset);
		window.scrollTo(0, window.pageYOffset);
	}

	render() {
		const { infos, applicants, appliedJobs, appliedJobsFeedback, company } =
			this.props;
		const { filter, location, preferredCategory } = this.state;

		let posts = [];
		let jobPostVisible = [];

		jobPostVisible = infos.filter((post) => post.Is_Deleted !== "Deleted");

		if (filter === "Job Suggestions") {
			posts = jobPostVisible.filter((info) =>
				info.Category.toLowerCase().includes(
					preferredCategory.toLowerCase()
				)
			);
		} else if (filter === "Most Recent") {
			posts = jobPostVisible.sort((a, b) => {
				return a.Date_Posted < b.Date_Posted ? 1 : -1;
			});
		} else if (filter === "Old Posts First") {
			posts = jobPostVisible.sort((a, b) => {
				return a.Date_Posted < b.Date_Posted ? -1 : 1;
			});
		}

		let count = 0;

		return (
			<>
				<Filter
					handleFilterChange={this.handleFilterChange}
					handleLocationChange={this.handleLocationChange}
					filter={filter}
					location={location}
					applicants={applicants}
				/>
				<div
					className='feed-container'
					style={!this.state.togglePanel ? { display: "none" } : {}}>
					{posts.map((info) => {
						let address =
							info.Company_Address.split(", ")[
								info.Company_Address.split(", ").length - 1
							];

						let applied = [];
						for (let a = 0; a < appliedJobs.length; a++) {
							if (appliedJobs[a].JobID === info.JobID) {
								applied = appliedJobs[a];
							}
						}

						let timeElapsed = TimeStamp.setTimeStamp(
							applied.Minutes,
							applied.Hour,
							applied.Day,
							applied.Month,
							applied.Year
						).split(" ");

						// Hide the posts if you are already applied to it over an hour ago -------
						let visible = true;
						if (
							(timeElapsed[1] !== "now" ||
								timeElapsed[1] !== "min" ||
								timeElapsed[1] !== "mins") &&
							info.Is_Applied === true
						) {
							visible = false;
						}

						if (
							(timeElapsed[1] === "now" ||
								timeElapsed[1] === "min" ||
								timeElapsed[1] === "mins") &&
							info.Is_Applied === true
						) {
							visible = true;
						}
						// -------

						let isPostVisible = true;
						for (let a = 0; a < appliedJobsFeedback.length; a++) {
							if (info.JobID === appliedJobsFeedback[a].JobID) {
								isPostVisible = false;
							}
						}

						let acronym = "";
						try {
							company.map((comp) => {
								if (comp.CompanyID === info.CompanyID) {
									acronym = comp.Company_Acronym;
									return null;
								}
							});
						} catch (error) {}

						if (
							`${address}`
								.toLowerCase()
								.includes(location.toLowerCase()) &&
							info.Active_Status === "Active" &&
							visible === true &&
							isPostVisible === true
						) {
							count += 1;
							return (
								<div key={info.JobID}>
									<Post
										info={info}
										acronym={acronym}
										activePage={this.props.activePage}
										onDelete={this.deletePost}
										toggleCompanyProfile={this.toggleCompanyProfile}
										togglePanel={this.state.togglePanel}
										setCompanyID={this.props.setCompanyID}
										isDeleted={this.props.isDeleted}
										numApplicants={this.props.numApplicants}
										darkTheme={this.props.darkTheme}
									/>
								</div>
							);
						}
					})}
				</div>

				{count === 0 && posts.length > 0 && location.length !== 0 ? (
					<p
						style={{
							textAlign: "center",
							padding: "10px",
							backgroundColor: "red",
							marginTop: "6px",
							fontSize: "12px",
						}}>
						No Posts Available in this Barangay!
					</p>
				) : count === 0 &&
				  localStorage.getItem("filter") !== "Job Suggestions" ? (
					<p
						style={{
							textAlign: "center",
							padding: "10px",
							backgroundColor: "red",
							marginTop: "6px",
							fontSize: "12px",
						}}>
						No posts to show!
					</p>
				) : (
					""
				)}

				{posts.length === 0 &&
					localStorage.getItem("filter") === "Job Suggestions" && (
						<p
							style={{
								textAlign: "center",
								padding: "10px",
								backgroundColor: "red",
								marginTop: "6px",
								fontSize: "12px",
							}}>
							No Suggested Posts Available!
						</p>
					)}
			</>
		);
	}
}

export default Feed;
