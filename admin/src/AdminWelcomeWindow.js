import React, { useEffect } from "react";
import Loading from "./Images/Loading2Blue.gif";
import "./AdminWelcomeWindow.css";
import AdminCountDown from "./AdminCountDown";
import { useNavigate } from "react-router-dom";

const AdminWelcomeWindow = ({ method, delay }) => {
	const navigate = useNavigate();

	useEffect(() => {
		return () => {
			navigate("/admin/dashboard");
		};
	}, []);
	return (
		<div className='welcome-container'>
			<div className='welcome-container-overlay'></div>
			<div className='welcome-container-content'>
				<img src={Loading} alt='Loading1 gif' />
				<h3>Welcome Administrator</h3>
				{/* <p>Initializing Components...</p> */}
				<p>{<AdminCountDown method={method} delay={delay} />}</p>
			</div>
		</div>
	);
};

export default AdminWelcomeWindow;
