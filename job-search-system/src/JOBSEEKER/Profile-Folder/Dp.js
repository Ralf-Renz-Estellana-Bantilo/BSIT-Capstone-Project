import React, { Component } from "react";
import "./Dp.css";
import User from "../../Images/User.png";
import CameraIcon from "../../Images/CameraIcon.png";
import CloseIcon from "../../Images/CloseIcon.png";
import Gap from "../../Gap";
import axios from "axios";
import AppConfiguration from "../../AppConfiguration";
import Loading from "../../Loading";

export class Dp extends Component {
	constructor() {
		super();
		this.state = {
			file: null,
			fileData: null,
			profileImg: User,
			toggleChooser: false,
			showImage: false,
			isLoading: false,
		};
	}

	handleFileChange = (event) => {
		try {
			this.setState({
				file: URL.createObjectURL(event.target.files[0]),
				fileData: event.target.files[0],
			});
		} catch (error) {
			alert(error);
			this.setState({
				file: null,
			});
		}
	};

	handleSave = async (e) => {
		try {
			this.setState({
				isLoading: true,
			});

			e.preventDefault();
			const { fileData } = this.state;
			const data = new FormData();
			data.append("file", fileData);
			data.append("upload_preset", "job-search-catarman-asset");

			axios
				.post(
					"https://api.cloudinary.com/v1_1/doprewqnx/image/upload",
					data
				)
				.then(async (res) => {
					await this.updateData(res.data.secure_url);
					this.setState({
						isLoading: false,
					});
				})
				.catch((error) => {
					alert(error);
					this.setState({
						isLoading: false,
					});
				});
		} catch (error) {
			alert(error);
		}
	};

	updateData = async (newFileName) => {
		const { file } = this.state;

		await axios
			.put(`${AppConfiguration.url()}/api/update-user-profile`, {
				image: newFileName,
				userID: sessionStorage.getItem("UserID"),
			})
			.then((response) => {});

		await axios
			.put(`${AppConfiguration.url()}/api/update-appplicant-profile`, {
				image: newFileName,
				userID: sessionStorage.getItem("UserID"),
			})
			.then(async (response) => {
				await this.props.changeCurrentUserProfile(
					newFileName,
					this.props.currentUser.UserID
				);
				this.setState({
					profileImg: newFileName,
					toggleChooser: false,
					file: null,
				});
			});
	};

	handleToggleHire = async () => {
		await this.props.handleToggleHire();

		const { hiringStatus } = this.props;
		const userSession = sessionStorage.getItem("UserID");

		await axios
			.put(`${AppConfiguration.url()}/api/update-appplicant-hiring-status`, {
				hiringStatus: hiringStatus,
				userID: userSession,
			})
			.then((response) => {});
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
				// console.log(error);
			}
		}

		return (
			<div className='profile-container'>
				<Gap />

				<div className='dp'>
					<div className='profile-picture'>
						<img
							src={`${User_Image}`}
							alt='Profile Image'
							onClick={this.toggleImagePreview}
							title='Preview Image'
						/>
					</div>

					{this.state.showImage ? (
						<div className='image-preview-container'>
							<div
								className='overlay-style'
								onClick={this.toggleImagePreview}
							/>
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
										src={User_Image}
										// src={`${AppConfiguration.url()}/assets/images/${User_Image}`}
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
								file: null,
							});
						}}>
						<img src={CameraIcon} alt='Edit Profile' />
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

				{this.state.isLoading && <Loading />}
			</div>
		);
	}
}

export default Dp;
