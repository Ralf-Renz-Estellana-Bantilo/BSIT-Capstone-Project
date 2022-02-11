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
			Contact_Person_Name,
			Contact_Person_Position,
			Contact_Person_Number,
			Contact_Person_Email,
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
						{Contact_Person_Name === null ? (
							<h2 style={{ marginBottom: "10px" }}>
								Employer's Name: {Employer_Name}
							</h2>
						) : (
							<>
								<div className='job-qualification-portion'>
									<h3>--- Contact Person ---</h3>
								</div>
								<h2 style={{ marginTop: "0px" }}>
									Full Name: <u>{Contact_Person_Name}</u>
								</h2>
								<h2 style={{ marginTop: "0px" }}>
									Position: <u>{Contact_Person_Position}</u>
								</h2>
								<h2 style={{ marginTop: "0px" }}>
									Contact Number: <u>{Contact_Person_Number}</u>
								</h2>
								<h2 style={{ marginTop: "0px", marginBottom: "10px" }}>
									Email Address: <u>{Contact_Person_Email}</u>
								</h2>
							</>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default PostContent;
