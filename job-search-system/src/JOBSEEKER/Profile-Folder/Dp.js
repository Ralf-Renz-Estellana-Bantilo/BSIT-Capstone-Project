import React, { Component } from "react";
import "./Dp.css";
import User from "../../Images/User.png";
import CameraIcon from "../../Images/CameraIcon.png";
import CloseIcon from "../../Images/CloseIcon.png";
import Gap from "../../Gap";
import axios from "axios";
import AppConfiguration from "../../AppConfiguration";

export class Dp extends Component {
	constructor() {
		super();
		this.state = {
			file: null,
			fileData: null,
			profileImg: User,
			toggleChooser: false,
			showImage: false,
		};
	}

	handleFileChange = (event) => {
		try {
			this.setState({
				file: URL.createObjectURL(event.target.files[0]),
				fileData: event.target.files[0],
			});
		} catch (error) {
			this.setState({
				file: null,
			});
		}
	};

	handleSave = async (e) => {
		e.preventDefault();
		const { fileData, file } = this.state;
		const date =
			new Date().getMonth() +
			1 +
			"" +
			new Date().getDate() +
			new Date().getFullYear();

		const newFileName = date + "_" + fileData.name;

		if (fileData.size > 2090000) {
			alert("File too large (2mb limit) ! Please try again!");
			this.setState({
				file: null,
				fileData: null,
			});
		} else {
			try {
				const data = new FormData();
				data.append("image", fileData);
				await fetch(`${AppConfiguration.url()}/api/upload-image`, {
					method: "POST",
					body: data,
				})
					.then((result) => {
						// console.log("The File has been Uploaded...");
					})
					.catch((error) => {
						console.log("Multer Error!", error);
					});

				await fetch(`${AppConfiguration.url()}/api/upload-image-admin`, {
					method: "POST",
					body: data,
				})
					.then(async (result) => {
						// console.log(
						// 	"The File has been Uploaded to the Administrator..."
						// );
					})
					.catch((error) => {
						console.log("Multer Error!", error);
					});

				await axios
					.put(`${AppConfiguration.url()}/api/update-user-profile`, {
						image: newFileName,
						userID: sessionStorage.getItem("UserID"),
					})
					.then((response) => {
						// console.log(response);
					});

				await axios
					.put(`${AppConfiguration.url()}/api/update-appplicant-profile`, {
						image: newFileName,
						userID: sessionStorage.getItem("UserID"),
					})
					.then(async (response) => {
						// console.log(response);
						await this.props.changeCurrentUserProfile(
							newFileName,
							this.props.currentUser.UserID
						);
						this.setState({
							profileImg: file,
							toggleChooser: false,
							file: null,
						});
					});
			} catch (error) {
				alert(error);
			}
		}
	};

	handleToggleHire = async () => {
		await this.props.handleToggleHire();
		// await this.props.setTheme();

		const { hiringStatus } = this.props;
		const userSession = sessionStorage.getItem("UserID");

		await axios
			.put(`${AppConfiguration.url()}/api/update-appplicant-hiring-status`, {
				hiringStatus: hiringStatus,
				userID: userSession,
			})
			.then((response) => {
				// console.log("Hiring_Status has been Updated");
			});
	};

	toggleImagePreview = () => {
		this.setState({
			showImage: !this.state.showImage,
		});
	};

	render() {
		const sessionApplicant = sessionStorage.getItem("ApplicantID");
		const { First_Name, Middle_Name, Last_Name, User_Image } =
			this.props.currentUser;
		const { hiringStatus, applicants } = this.props;
		let isHirable = false;

		let currentApplicant = applicants.filter(
			(applicant) => applicant.ApplicantID === sessionApplicant
		);

		if (currentApplicant) {
			try {
				if (
					currentApplicant[0].Preferred_Job !== null &&
					currentApplicant[0].Preferred_Category !== null &&
					currentApplicant[0].Good_At !== null &&
					currentApplicant[0].Interested_In !== null
				) {
					isHirable = true;
				}
			} catch (error) {
				console.log(error);
			}
		}

		return (
			<div className='profile-container'>
				<Gap />

				<div className='dp'>
					<div className='profile-picture'>
						<img
							src={`../assets/${User_Image}`}
							alt='Profile Image'
							onClick={this.toggleImagePreview}
							title='Preview Image'
						/>
					</div>

					{this.state.showImage ? (
						<div className='image-preview-container'>
							<div className='overlay-style' />
							<div className='image-preview'>
								<img
									className='close-preview'
									src={CloseIcon}
									alt='Close'
									onClick={this.toggleImagePreview}
								/>
								<h4 className='image-preview-title'>Image Preview</h4>
								<div className='image-wrapper'>
									<img
										className='image-preview-img'
										src={`../assets/${User_Image}`}
										alt='profile'
									/>
								</div>
							</div>
						</div>
					) : (
						""
					)}

					<div
						className='camera'
						title={
							this.state.toggleChooser
								? "Toggle File Picker Off"
								: "Toggle File Picker On"
						}
						onClick={() => {
							this.setState({
								toggleChooser: !this.state.toggleChooser,
							});
						}}>
						<img
							src={CameraIcon}
							alt='Edit Profile'
							// title='Edit Profile Picture'
						/>
					</div>
				</div>
				{this.state.toggleChooser ? (
					<form
						className='file-picker'
						onSubmit={(e) => this.handleSave(e)}>
						<h3>
							{this.state.file !== null
								? "Update Profile Picture Preview"
								: "Update Profile Picture"}
						</h3>
						<input
							type='file'
							name='updatePic'
							onChange={(e) => this.handleFileChange(e)}
							accept='image/jpeg, image/png'
						/>
						<div className='img-holder'>
							<img
								src={this.state.file}
								alt={
									this.state.file !== null
										? "New Profile Picture"
										: "No Loaded Picture"
								}
							/>
						</div>
						{this.state.file !== null ? (
							<div className='update'>
								<button onClick={this.handleSave}>Save</button>
							</div>
						) : (
							""
						)}
						<p>Click the camera icon to toggle file picker on and off</p>
					</form>
				) : (
					""
				)}
				<h2>{`${First_Name} ${Middle_Name} ${Last_Name}`}</h2>

				{isHirable && (
					<div className='active-status-container'>
						<h3>Available to hire</h3>

						<label className='switch'>
							<p className='switch-on'>on</p>
							<p className='switch-off'>off</p>
							<input
								type='checkbox'
								className='checkbox'
								checked={
									`${hiringStatus}` === "Active" ? "checked" : ""
								}
								onChange={this.handleToggleHire}
							/>
							<span className='slider'></span>
						</label>
					</div>
				)}
			</div>
		);
	}
}

export default Dp;
