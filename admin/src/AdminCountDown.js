import React, { Component } from "react";

export class AdminCountDown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: this.props.delay,
		};
	}

	componentDidMount() {
		this.timer = setInterval(() => {
			this.setState({
				count: this.state.count - 1,
			});
		}, 1000);
	}

	componentDidUpdate(prevState) {
		if (prevState.count !== this.state.count && this.state.count === 0) {
			clearInterval(this.timer);
			this.props.method();
		}
	}

	render() {
		return (
			<div>
				{this.state.count === 3
					? "Initializing Components."
					: this.state.count === 2
					? "Initializing Components.."
					: this.state.count === 1
					? "Initializing Components..."
					: "Initializing Components"}
			</div>
		);
	}
}

export default AdminCountDown;
