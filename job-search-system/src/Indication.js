import React, { Component } from "react";
import CountDown from "./JOBSEEKER/Home-Folder/CountDown";

export class Indication extends Component {
	render() {
		return (
			<div
				className='indication-container'
				style={
					this.props.module === "jobseeker"
						? { position: "fixed", zIndex: "99", top: "122px" }
						: { position: "fixed", zIndex: "99", top: "70px" }
				}>
				<div
					className='indication'
					style={
						this.props.type === "primary"
							? {
									background:
										"linear-gradient(20deg, #00b2ff, #006aff)",
							  }
							: {
									background:
										"linear-gradient(20deg, #ff7b00, #ff004c)",
							  }
					}>
					<div>
						{this.props.text}
						{
							<CountDown
								method={this.props.method}
								delay={this.props.delay}
							/>
						}
					</div>
				</div>
			</div>
		);
	}
}

Indication.defaultProps = {
	module: "jobseeker",
};

export default Indication;
