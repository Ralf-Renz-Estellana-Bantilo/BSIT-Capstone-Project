import React, { Component } from "react";

export class CountDownSignUp extends Component {
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
		return <div></div>;
	}
}

export default CountDownSignUp;
