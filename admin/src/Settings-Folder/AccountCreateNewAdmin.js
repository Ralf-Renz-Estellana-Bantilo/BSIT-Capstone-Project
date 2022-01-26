import React, { useState } from "react";
import "./AccountCreateNewAdmin.css";

const AccountCreateNewAdmin = () => {
	const [step, setStep] = useState(1);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [newAdminUsername, setNewAdminUsername] = useState("");
	const [newAdminPassword, setNewAdminPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	return (
		<div className='post-preview-panel'>
			<div className='job-post-header'>
				<h3>Create New Administrator</h3>
			</div>
			<div className='new-admin-container'>
				{step === 1 ? (
					<div className='new-admin'>
						<div className='new-admin-header'>
							<h3>Verify Current Administrator</h3>
						</div>
						<form
							className='new-admin-form'
							onSubmit={(e) => {
								e.preventDefault();
								setStep(2);
							}}>
							<input
								autoFocus
								type='password'
								placeholder={`Current Admin's Username`}
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
							<input
								type='password'
								placeholder={`Current Admin's Password`}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button
								onClick={(e) => {
									e.preventDefault();
									setStep(2);
								}}>
								Continue
							</button>
						</form>
					</div>
				) : (
					<div className='new-admin'>
						<div className='new-admin-header'>
							<h3>Enter New Administrator's Credentials</h3>
						</div>
						<form
							className='new-admin-form'
							onSubmit={(e) => {
								e.preventDefault();
								setStep(1);
							}}>
							<input
								type='text'
								placeholder='First Name'
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
							<input
								type='text'
								placeholder='Middle Name'
								value={middleName}
								onChange={(e) => setMiddleName(e.target.value)}
							/>
							<input
								type='text'
								placeholder='Last Name'
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>

							<input
								type='password'
								placeholder='Username'
								value={newAdminUsername}
								onChange={(e) => setNewAdminUsername(e.target.value)}
							/>
							<input
								type='password'
								placeholder='Password'
								value={newAdminPassword}
								onChange={(e) => setNewAdminPassword(e.target.value)}
							/>
							<input
								type='password'
								placeholder='Confirm Password'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							<button
								onClick={(e) => {
									e.preventDefault();
									setStep(1);
								}}>
								Create Admin
							</button>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default AccountCreateNewAdmin;
