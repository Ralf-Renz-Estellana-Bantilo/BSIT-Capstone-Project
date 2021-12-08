import React, { Component } from "react";
import JobVacancyForm from "./JobVacancyForm";

export class WorkPost extends Component {
	toggle = () => {
		this.props.toggle();
	};

	viewPost = (post) => {
		this.props.onAddPost(post);
	};

	render() {
		const { currentUser, company } = this.props;
		return (
			<div>
				<JobVacancyForm
					toggle={this.toggle}
					onAddPost={this.viewPost}
					currentUser={currentUser}
					company={company}
					targetJobPost={this.props.targetJobPost}
					resetTargetJobPost={this.props.resetTargetJobPost}
					updateJobPostContent={this.props.updateJobPostContent}
				/>
			</div>
		);
	}
}

export default WorkPost;
