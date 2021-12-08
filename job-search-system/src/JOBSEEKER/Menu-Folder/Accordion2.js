import React, { useState } from "react";
import "./Accordion.css";
import { Link } from "react-router-dom";

const Accordion2 = ({ setTheme, darkTheme }) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className='accordion-item'>
			<div
				className='accordion-title'
				onClick={() => setIsActive(!isActive)}>
				<div>Setting & Privacy</div>
				<div
					className='toggle-container'
					style={{
						background: isActive
							? "linear-gradient(to bottom, #ff7b00, #ff004c"
							: "linear-gradient(to bottom, #00b2ff, #006aff",
					}}>
					<div
						className='toggleAccordion'
						title={isActive ? "Show Less" : "Show More"}>
						{isActive ? "-" : "+"}
					</div>
				</div>
			</div>

			{isActive && (
				<div className='accordion-content'>
					<div className='accordion-content-button'>
						<div className='active-status-container'>
							<h3>Light Mode</h3>

							<label className='switch'>
								<p className='switch-on'>on</p>
								<p className='switch-off'>off</p>
								<input
									type='checkbox'
									className='checkbox'
									checked={!darkTheme ? "checked" : ""}
									onChange={setTheme}
								/>
								<span className='slider'></span>
							</label>
						</div>
						<Link to='/jobseeker/menu/settings'>
							<button>Settings</button>{" "}
						</Link>
						<Link to='/jobseeker/menu/terms-and-condition'>
							<button>Terms and Condition</button>{" "}
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default Accordion2;
