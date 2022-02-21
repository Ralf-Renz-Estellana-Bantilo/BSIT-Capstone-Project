import React, { Component } from "react";
import CountDownSignUp from "./JOBSEEKER/Home-Folder/CountDownSignUp";
import Load from "./Images/Load.gif";

export class Indication extends Component {
	render() {
		return (
			<div
				className='indication-container'
				style={
					this.props.module === "jobseeker"
						? { position: "fixed", zIndex: "99", top: "122px" }
						: { position: "fixed", zIndex: "99", top: "69px" }
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
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							position: "relative",
						}}>
						{this.props.text}
						{
							<CountDownSignUp
								method={this.props.method}
								delay={this.props.delay}
							/>
						}
						{this.props.isVisible && (
							<img
								src={Load}
								alt='Loading state'
								style={{
									height: "30px",
									position: "absolute",
									right: "10px",
								}}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
}

Indication.defaultProps = {
	module: "jobseeker",
	isVisible: false,
};

export default Indication;
