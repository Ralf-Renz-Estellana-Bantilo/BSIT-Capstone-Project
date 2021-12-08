import React, { Component } from "react";
import "./Dp.css";
import User from "../../Images/User.png";
import CameraIcon from "../../Images/CameraIcon.png";
import CloseIcon from "../../Images/CloseIcon.png";
import Gap from "../../Gap";
import axios from "axios";

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

	handleFileChange = async (event) => {
		await this.setState({
			file: URL.createObjectURL(event.target.files[0]),
			fileData: event.target.files[0],
		});

		console.log(this.state.fileData);
	};

	handleSave = async (e) => {
		e.preventDefault();

		try {
			const data = new FormData();
			data.append("image", this.state.fileData);
			await fetch("http://localhost:2000/api/upload-image", {
				method: "POST",
				body: data,
			})
				.then(async (result) => {
					console.log("The File has been Uploaded...");
					await this.props.changeCurrentUserProfile(
						this.state.fileData.name,
						this.props.currentUser.UserID
					);
				})
				.catch((error) => {
					console.log("Multer Error!", error);
				});

			await fetch("http://localhost:2000/api/upload-image-admin", {
				method: "POST",
				body: data,
			})
				.then(async (result) => {
					console.log(
						"The File has been Uploaded to the Administrator..."
					);
				})
				.catch((error) => {
					console.log("Multer Error!", error);
				});

			await axios
				.put("http://localhost:2000/api/update-user-profile", {
					image: this.state.fileData.name,
					userID: sessionStorage.getItem("UserID"),
				})
				.then((response) => {
					console.log(response);
				});

			await axios
				.put("http://localhost:2000/api/update-appplicant-profile", {
					image: this.state.fileData.name,
					userID: sessionStorage.getItem("UserID"),
				})
				.then((response) => {
					console.log(response);
				});

			this.setState({
				profileImg: this.state.file,
				toggleChooser: false,
				file: null,
			});
		} catch (error) {
			alert(error);
		}
	};

	handleToggleHire = async () => {
		await this.props.handleToggleHire();
		// await this.props.setTheme();

		const { hiringStatus } = this.props;
		const userSession = sessionStorage.getItem("UserID");

		await axios
			.put("http://localhost:2000/api/update-appplicant-hiring-status", {
				hiringStatus: hiringStatus,
				userID: userSession,
			})
			.then((response) => {
				console.log("Hiring_Status has been Updated");
			});
	};

	toggleImagePreview = () => {
		this.setState({
			showImage: !this.state.showImage,
		});
	};

	render() {
		const { First_Name, Middle_Name, Last_Name, User_Image } =
			this.props.currentUser;
		const { hiringStatus } = this.props;

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
								{/* <div
									className='close-preview'
									onClick={this.toggleImagePreview}>
									x
								</div> */}
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

					<div className='camera'>
						<img
							src={CameraIcon}
							alt='Edit Profile'
							title='Edit Profile Picture'
							onClick={() => {
								this.setState({
									toggleChooser: !this.state.toggleChooser,
								});
							}}
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

				<div className='active-status-container'>
					<h3>Available to hire</h3>

					<label className='switch'>
						<p className='switch-on'>on</p>
						<p className='switch-off'>off</p>
						<input
							type='checkbox'
							className='checkbox'
							checked={`${hiringStatus}` === "Active" ? "checked" : ""}
							onChange={this.handleToggleHire}
						/>
						<span className='slider'></span>
					</label>
				</div>
			</div>
		);
	}
}

export default Dp;
