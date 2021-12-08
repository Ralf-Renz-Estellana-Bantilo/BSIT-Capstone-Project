import React, { Component } from "react";
import { Link } from "react-router-dom";

export class UnknownPage extends Component {
	render() {
		let isLogin = `${this.props.isLogin}`;
		return (
			<div>
				<h2>Page not Found</h2>
				{isLogin ? <Link to={`/`}>Back</Link> : <Link to='/'>Back</Link>}

				<p>{isLogin}</p>
			</div>
		);
	}
}

export default UnknownPage;
