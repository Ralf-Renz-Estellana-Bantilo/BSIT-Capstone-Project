import React, { Component } from "react";
import "./PostContent.css";

export class PostContent extends Component {
	constructor() {
		super();

		this.state = {
			height: 0,
		};
	}

	componentDidMount() {
		const height = this.divElement.clientHeight;
		this.setState({ height });
	}

	render() {
		const {
			Job_Qualifications,
			Job_Requirements,
			Job_Description,
			Employer_Name,
		} = this.props.info;
		const { showMore } = this.props;
		const { height } = this.state;

		return (
			<div
				className='post-content-container'
				style={showMore ? { height: "8px" } : { height: `${height}px` }}>
				<div
					ref={(divElement) => {
						this.divElement = divElement;
					}}
					className='post-content'>
					<div className='job-qualification-container'>
						<div className='job-qualification-portion'>
							<h3>--- Job Qualifications ---</h3>
							<p>{Job_Qualifications}</p>
						</div>
						<div className='job-qualification-portion'>
							<h3>--- Job Requirements ---</h3>
							<p>{Job_Requirements}</p>
						</div>
						<div className='job-qualification-portion'>
							<h3>--- Job Description ---</h3>
							<p>{Job_Description}</p>
						</div>

						<h2>Employer's Name: {Employer_Name}</h2>
					</div>
				</div>
			</div>
		);
	}
}

export default PostContent;
