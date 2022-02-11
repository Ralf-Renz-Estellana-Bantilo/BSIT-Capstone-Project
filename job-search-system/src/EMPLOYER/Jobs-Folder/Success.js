import React, { Component } from "react";
import Indication from "../../Indication";
import "./Confirm.css";

export class Success extends Component {
	toggleView = async () => {
		this.onAddPost();
		await this.props.resetTargetJobPost();
		await this.props.toggle();
	};

	onAddPost = async () => {
		await this.props.onAddPost(this.props.jobPost);
	};

	updateJobPostContent = async () => {
		await this.props.updateJobPostContent(this.props.jobPost);
	};

	update = async () => {
		this.updateJobPostContent();
		await this.props.resetTargetJobPost();
		await this.props.toggle();
	};

	render() {
		const { targetJobPost } = this.props;
		return (
			<>
				{targetJobPost ? (
					<Indication
						type='primary'
						text='Updating Job Post... Please wait...'
						// text='Job Post Successfully Updated!'
						method={this.update}
						delay={3}
						module='employer'
					/>
				) : (
					<Indication
						type='primary'
						text='Posting Job Post... Please wait...'
						method={this.toggleView}
						delay={3}
						module='employer'
					/>
				)}
			</>
		);
	}
}

export default Success;
