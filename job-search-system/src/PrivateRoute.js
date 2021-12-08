import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";

export default function PrivateRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) => {
				return Auth.isAuthenticated() ? (
					<Component {...props} />
				) : (
					<Redirect to='login' />
				);
			}}></Route>
	);
}
