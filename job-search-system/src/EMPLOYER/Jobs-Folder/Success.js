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
						text='UPDATING JOB POST... PLEASE WAIT...'
						method={this.update}
						isVisible={true}
						delay={3}
						module='employer'
					/>
				) : (
					<Indication
						type='primary'
						text='PROCESSING YOUR JOB POST... PLEASE WAIT...'
						method={this.toggleView}
						isVisible={true}
						delay={3}
						module='employer'
					/>
				)}
			</>
		);
	}
}

export default Success;
