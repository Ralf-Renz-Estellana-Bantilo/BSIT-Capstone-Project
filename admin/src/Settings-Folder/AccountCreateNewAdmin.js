import axios from "axios";
import React, { useState } from "react";
import shortid from "shortid";
import AdminResources from "../AdminResources";
import AppConfiguration from "../AppConfiguration";
import User from "../Images/User.png";
import "./AccountCreateNewAdmin.css";

const AccountCreateNewAdmin = ({
	admin,
	administrators,
	setAdministrators,
}) => {
	const [step, setStep] = useState(1);
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);

	const [firstName, setFirstName] = useState(null);
	const [middleName, setMiddleName] = useState(null);
	const [lastName, setLastName] = useState(null);
	const [newAdminUsername, setNewAdminUsername] = useState(null);
	const [newAdminPassword, setNewAdminPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);

	const handleVerifyCurrentAdmin = () => {
		const { Username } = admin;
		try {
			if (username === null || password === null) {
				alert("Please input data!");
			} else if (username !== Username) {
				alert("Wrong entries! Please try again!");
			} else {
				axios
					.post(`${AppConfiguration.url()}/api/login`, {
						role: "Admin",
						username: username,
						password: password,
					})
					.then(async (response) => {
						if (response.data.length === 1) {
							alert("Admin Verified");
							setStep(2);
						} else {
							alert("Wrong entries! Please try again!");
						}
					});
			}
		} catch (error) {}
	};

	const handleCreateNewAdmin = async () => {
		if (
			firstName === null ||
			middleName === null ||
			lastName === null ||
			lastName === null ||
			newAdminUsername === null ||
			newAdminPassword === null ||
			confirmPassword === null
		) {
			alert("Please input data");
		} else if (newAdminPassword !== confirmPassword) {
			alert(`Password doesn't match`);
		} else {
			const newAdmin = {
				UserID: shortid.generate(),
				First_Name: AdminResources.formatName(firstName),
				Middle_Name: AdminResources.formatName(middleName),
				Last_Name: AdminResources.formatName(lastName),
				Sex: "Male",
				Role: "Admin",
				Username: newAdminUsername,
				Password: newAdminPassword,
				User_Image:
					"https://res.cloudinary.com/doprewqnx/image/upload/v1648959524/jntowv75wyhkqvy4o1xu.png",
			};
			await axios
				.post(`${AppConfiguration.url()}/api/create-user`, {
					userID: newAdmin.UserID,
					firstName: newAdmin.First_Name,
					middleName: newAdmin.Middle_Name,
					lastName: newAdmin.Last_Name,
					sex: newAdmin.Sex,
					role: newAdmin.Role,
					username: newAdmin.Username,
					password: newAdmin.Password,
					userImage: newAdmin.User_Image,
				})
				.then(() => {
					alert("NEW ADMINSTRATOR IS ADDED TO THE DATABASE!");
					setUsername(null);
					setPassword(null);
					setFirstName(null);
					setMiddleName(null);
					setLastName(null);
					setNewAdminUsername(null);
					setNewAdminPassword(null);
					setConfirmPassword(null);
					setStep(1);

					setAdministrators([...administrators, newAdmin]);
				});
		}
	};

	// Alphabetical Sorting
	administrators.sort((a, b) => (a.Last_Name > b.Last_Name ? 1 : -1));

	return (
		<div className='post-preview-panel'>
			<div className='job-post-header'>
				<h3>Create New Administrator</h3>
			</div>
			<div className='new-admin-container'>
				{/* {step === 1 && (
					<div className='new-admin'>
						<div className='new-admin-header'>
							<h3>Verify Current Administrator</h3>
						</div>
						<form
							className='new-admin-form'
							onSubmit={(e) => {
								e.preventDefault();
								handleVerifyCurrentAdmin();
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
									handleVerifyCurrentAdmin();
								}}>
								Continue
							</button>
						</form>
						{administrators.length > 1 && (
							<div className='admin-list-container'>
								{administrators.map((admin) => {
									return (
										<div className='admin-list'>
											<div className='admin-list-img'>
												<img
													src={admin.User_Image}
													alt='Administrator'
												/>
											</div>
											<h3>{`${admin.Last_Name}, ${admin.First_Name} ${admin.Middle_Name}`}</h3>
										</div>
									);
								})}
							</div>
						)}
					</div>
				)} */}

				{step === 2 && (
					<div className='new-admin'>
						<div className='new-admin-header'>
							<h3>Enter New Administrator's Credentials</h3>
						</div>
						<form
							className='new-admin-form'
							onSubmit={(e) => {
								e.preventDefault();
								handleCreateNewAdmin();
							}}>
							<input
								autoFocus
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
									handleCreateNewAdmin();
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
