import React, { useEffect, useState } from "react";
import SearchIcon from "./Images/SearchIcon.png";
import Logout from "./Images/Logout.png";
import MenuIconFilled from "./Images/MenuIconFilled.png";
import CreateIcon from "./Images/CreateIcon.png";
import JobsIcon from "./Images/JobsIcon.png";
import CloseIcon from "./Images/CloseIcon.png";
import CameraIcon from "./Images/CameraIcon.png";
import "./Navbar.css";
import Modal from "./Modal";
import axios from "axios";
import AppConfiguration from "./AppConfiguration";

const Navbar = ({
	isSidebarOpen,
	setSidebarOpen,
	activePage,
	isJobPostPanelOpen,
	setJobPostPanelOpen,
	text,
	setText,
	admin,
	setAdmin,
	handleChangeLink,
}) => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [isProfileModalOpen, setProfileModalOpen] = useState(false);
	const [toggleChooser, setToggleChooser] = useState(false);
	const [file, setFile] = useState(null);
	const [fileData, setFileData] = useState(null);

	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [prevFirstName, setPrevFirstName] = useState("");
	const [prevMiddleName, setPrevMiddleName] = useState("");
	const [prevLastName, setPrevLastName] = useState("");

	const [activeLink, setActiveLink] = useState("Account");

	const onCloseModal = () => {
		setModalOpen(false);
	};

	const onLogout = () => {
		sessionStorage.clear();
		localStorage.clear();
		onCloseModal();
	};

	const openJobPostPanel = () => {
		setJobPostPanelOpen(true);
	};

	const closeJobPostPanel = () => {
		setJobPostPanelOpen(false);
	};

	const handleSearch = (e) => {
		setText(e.target.value);
	};

	const handleFileChange = (event) => {
		try {
			setFile(URL.createObjectURL(event.target.files[0]));
			setFileData(event.target.files[0]);
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdateDP = async () => {
		let newFileName = "";

		if (fileData.size > 2090000) {
			alert("File too large (2mb limit) ! Please try again!");
		} else {
			try {
				const data = new FormData();
				data.append("file", fileData);
				data.append("upload_preset", "job-search-catarman-asset");

				await axios
					.post(
						"https://api.cloudinary.com/v1_1/doprewqnx/image/upload",
						data
					)
					.then(async (res) => {
						newFileName = res.data.secure_url;
						setAdmin({
							...admin,
							User_Image: res.data.secure_url,
						});
					})
					.catch((error) => {
						alert(error);
					});

				await axios
					.put(`${AppConfiguration.url()}/api/update-user-profile`, {
						image: newFileName,
						userID: sessionStorage.getItem("UserID"),
					})
					.then((response) => {
						setProfileModalOpen(false);
						setToggleChooser(false);
					});
			} catch (error) {
				alert(error);
			}
		}
	};

	const handleUpdateName = () => {
		setProfileModalOpen(false);
		setAdmin({
			...admin,
			First_Name: firstName,
			Middle_Name: middleName,
			Last_Name: lastName,
		});

		axios
			.put(`${AppConfiguration.url()}/api/update-user-business-profile`, {
				firstName: firstName,
				middleName: middleName,
				lastName: lastName,
				userID: sessionStorage.getItem("UserID"),
			})
			.then((response) => {
				// console.log(response);
			});
	};

	useEffect(() => {
		setFirstName(admin.First_Name);
		setMiddleName(admin.Middle_Name);
		setLastName(admin.Last_Name);

		setPrevFirstName(admin.First_Name);
		setPrevMiddleName(admin.Middle_Name);
		setPrevLastName(admin.Last_Name);
	}, [isProfileModalOpen]);

	const panel = localStorage.getItem("activePage");

	let isUpdateButtonEnable = true;
	if (
		lastName === prevLastName &&
		firstName === prevFirstName &&
		middleName === prevMiddleName
	) {
		isUpdateButtonEnable = false;
	} else if (lastName === "" || firstName === "" || middleName === "") {
		isUpdateButtonEnable = false;
	}

	let imageSource = "";
	if (
		`${AppConfiguration.url()}/assets/images/${admin.User_Image}`.includes(
			"undefined"
		)
	) {
		imageSource =
			"../public/assets/https://res.cloudinary.com/doprewqnx/image/upload/v1648959524/jntowv75wyhkqvy4o1xu.png";
	} else {
		imageSource = `${AppConfiguration.url()}/assets/images/${
			admin.User_Image
		}`;
	}

	return (
		<>
			{isProfileModalOpen && (
				<div className='admin-profile-container'>
					<div className='profile-modal-container'>
						<div
							className='overlay-style'
							onClick={() => {
								setProfileModalOpen(false);
								setFile(null);
							}}
						/>
						<div className='profile-modal-style'>
							<div className='profile-modal-header'>
								<h3 className='modal-sub-text'>Admin Profile</h3>
								<div className='modal-close'>
									<img
										className='closeIcon'
										src={CloseIcon}
										alt='Close'
										onClick={() => {
											setProfileModalOpen(false);
											setFile(null);
										}}
										title='Close'
									/>
								</div>
							</div>
							<div className='profile-content'>
								<div className='profile-image-container'>
									<div className='profile-image'>
										<img src={admin.User_Image} alt='Admin' />
									</div>
									<div
										className='camera'
										onClick={() => {
											setToggleChooser(!toggleChooser);
											setFile(null);
										}}>
										<img
											src={CameraIcon}
											alt='Edit Profile'
											title='Edit Profile Picture'
										/>
									</div>
								</div>
								{toggleChooser ? (
									<div className='file-picker'>
										<h3>
											{file !== null
												? "Update Profile Picture Preview"
												: "Update Profile Picture"}
										</h3>
										<input
											type='file'
											name='updatePic'
											accept='image/jpeg, image/png'
											onChange={(e) => handleFileChange(e)}
										/>
										<div className='img-holder'>
											<img
												src={file}
												alt={
													file !== null
														? "New Profile Picture"
														: "No Loaded Picture"
												}
											/>
										</div>
										{file && (
											<div className='update'>
												<button onClick={handleUpdateDP}>
													Save
												</button>
											</div>
										)}

										<p>
											Click the camera icon to toggle file picker on
											and off
										</p>
									</div>
								) : (
									<div className='profile-data'>
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
										<button
											onClick={handleUpdateName}
											style={
												isUpdateButtonEnable
													? { opacity: "1" }
													: { opacity: "0.3" }
											}
											disabled={
												isUpdateButtonEnable ? "" : "disabled"
											}>
											Save
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}

			<div className='navbar-container'>
				{isModalOpen && (
					<Modal
						headText='Logout Confirmation'
						modalText={`Hey Admin, are you sure you want to logout?`}
						confirmText='Logout'
						closeText='Cancel'
						close={onCloseModal}
						confirm={onLogout}
						path='/'
					/>
				)}
				<div className='navbar-left-portion'>
					{!isSidebarOpen && (
						<img
							src={MenuIconFilled}
							alt='Menu'
							onClick={() => setSidebarOpen(!isSidebarOpen)}
						/>
					)}

					{panel === "Job Posts" ||
					panel === "Applicants" ||
					panel === "Companies" ? (
						<div className='search-container'>
							<img src={SearchIcon} alt='Search Here' />
							<input
								type='text'
								placeholder='Search here'
								value={text}
								onChange={(e) => handleSearch(e)}
							/>
						</div>
					) : panel === "Settings" ? (
						<div className='search-container'>
							<div className='menu-button-container'>
								<p
									style={
										activeLink === "Account"
											? { color: "#006aff", fontWeight: "600" }
											: {}
									}
									onClick={() => {
										setActiveLink("Account");
										handleChangeLink("Account");
									}}>
									Account
								</p>
								<p
									style={
										activeLink === "About"
											? { color: "#006aff", fontWeight: "600" }
											: {}
									}
									onClick={() => {
										setActiveLink("About");
										handleChangeLink("About");
									}}>
									About Us
								</p>
								<p
									style={
										activeLink === "Privacy"
											? { color: "#006aff", fontWeight: "600" }
											: {}
									}
									onClick={() => {
										setActiveLink("Privacy");
										handleChangeLink("Privacy");
									}}>
									Privacy Policy
								</p>
								<p
									style={
										activeLink === "Terms"
											? { color: "#006aff", fontWeight: "600" }
											: {}
									}
									onClick={() => {
										setActiveLink("Terms");
										handleChangeLink("Terms");
									}}>
									Terms and Conditions
								</p>
								<p
									style={
										activeLink === "Contact"
											? { color: "#006aff", fontWeight: "600" }
											: {}
									}
									onClick={() => {
										setActiveLink("Contact");
										handleChangeLink("Contact");
									}}>
									Contact Us
								</p>
							</div>
						</div>
					) : (
						""
					)}
				</div>

				<div className='navbar-right-portion'>
					{activePage === "Job Posts" && (
						<div className='navbar-button-container-holder'>
							{activePage === "Job Posts" &&
							isJobPostPanelOpen === false ? (
								<div className='navbar-button-container'>
									<img
										src={CreateIcon}
										title='Post a Job Vacancy'
										alt='Create Job Post Icon'
										onClick={openJobPostPanel}
									/>
								</div>
							) : (
								<div className='navbar-button-container'>
									<img
										src={JobsIcon}
										title='Job Posts'
										alt='Job Posts'
										onClick={closeJobPostPanel}
										style={{ height: "27px" }}
									/>
								</div>
							)}
						</div>
					)}

					<div className='profile-container'>
						<h5>
							{panel !== "Settings" &&
								`${admin.First_Name} ${admin.Middle_Name} ${admin.Last_Name}`}
						</h5>
						<div className='profile-img'>
							<img
								src={admin.User_Image}
								alt='Administrator'
								onClick={() => setProfileModalOpen(true)}
							/>
						</div>
					</div>
					<div className='logout-container'>
						<img
							src={Logout}
							alt='Logout'
							title='Logout'
							onClick={() => setModalOpen(true)}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

Navbar.defaultProps = {
	activePage: "whatever",
	isJobPostPanelOpen: false,
	setJobPostPanelOpen: function () {
		// console.log("Function");
	},
	handleChangeLink: function () {
		// console.log("Function");
	},
};

export default Navbar;
