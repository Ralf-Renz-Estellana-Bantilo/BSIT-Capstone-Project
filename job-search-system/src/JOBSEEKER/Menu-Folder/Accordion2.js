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
				<div>Appearance & Privacy</div>
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
						<button>Settings</button>
						<button>Terms and Condition</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Accordion2;
