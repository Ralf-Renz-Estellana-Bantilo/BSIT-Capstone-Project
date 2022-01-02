import React, { useState } from "react";
import "./Accordion.css";
import { Link } from "react-router-dom";
import About from "./OutsideLinks/About";
import Contact from "./OutsideLinks/Contact";

const Accordion = () => {
	const [isActive, setIsActive] = useState(false);
	const [isAboutModal, setAboutModal] = useState(false);
	const [isContactModal, setContactModal] = useState(false);

	const userTypeSession = sessionStorage.getItem("UserType");
	let userType = "";

	if (userTypeSession === "Job Seeker") {
		userType = "jobseeker";
	} else if (userTypeSession === "Employer") {
		userType = "employer";
	}

	return (
		<div className='accordion-item'>
			<div
				className='accordion-title'
				onClick={() => setIsActive(!isActive)}>
				<div>Help & Support</div>
				<div
					className='toggle-container'
					style={{
						background: isActive
							? "linear-gradient(to bottom, #ff7b00, #ff004c)"
							: "linear-gradient(to bottom, #00b2ff, #006aff)",
					}}>
					<p title={isActive ? "Show Less" : "Show More"}>
						{isActive ? "-" : "+"}
					</p>
				</div>
			</div>
			{isActive && (
				<div className='accordion-content'>
					<div className='accordion-content-button'>
						<Link to={`/${userType}/menu/about`}>
							<button onClick={() => setAboutModal(true)}>
								About Job Search Catarman
							</button>
						</Link>
						<Link to={`/${userType}/menu/contact`}>
							<button onClick={() => setContactModal(true)}>
								Contact Us
							</button>
						</Link>
						<Link to={`/${userType}/menu/help`}>
							<button>Help Center</button>
						</Link>
					</div>
				</div>
			)}

			{isAboutModal && <About close={() => setAboutModal(false)} />}
			{isContactModal && <Contact close={() => setContactModal(false)} />}
		</div>
	);
};

export default Accordion;
