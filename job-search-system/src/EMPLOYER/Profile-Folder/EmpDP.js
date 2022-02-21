import axios from "axios";
import React, { Component } from "react";
import CameraIcon from "../../Images/CameraIcon.png";
import CloseIcon from "../../Images/CloseIcon.png";

export class Emp_DP extends Component {
	constructor() {
		super();
		this.state = {
			file: null,
			fileData: null,
			toggleChooser: false,
			showImage: false,
		};
	}

	toggleImagePreview = () => {
		this.setState({
			showImage: !this.state.showImage,
		});
	};

	handleFileChange = async (event) => {
		await this.setState({
			file: URL.createObjectURL(event.target.files[0]),
			fileData: event.target.files[0],
		});
	};

	handleSave = async (e) => {
		e.preventDefault();
		const { fileData } = this.state;
		const companySession = sessionStorage.getItem("CompanyID");
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
			const data = new FormData();
			data.append("image", fileData);
			await fetch("http://localhost:2000/api/upload-image", {
				method: "POST",
				body: data,
			})
				.then(async (result) => {
					console.log("The File has been Uploaded...");
					await this.props.changeCompanyProfile(
						newFileName,
						companySession
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
				.put("http://localhost:2000/api/update-company-picture", {
					image: newFileName,
					companyID: companySession,
				})
				.then((response) => {
					console.log(response);
				});

			// update applied jobs table
			await axios
				.put("http://localhost:2000/api/update-applied-job-picture", {
					image: newFileName,
					companyID: companySession,
				})
				.then((response) => {
					console.log(response);
				});

			// update job posts table
			await axios
				.put("http://localhost:2000/api/update-jobPost-picture", {
					image: newFileName,
					companyID: companySession,
				})
				.then((response) => {
					console.log(response);
				});

			// update employer feedback table
			await axios
				.put("http://localhost:2000/api/update-employer-feedback-picture", {
					image: newFileName,
					companyID: companySession,
				})
				.then((response) => {
					console.log(response);
				});
		}
	};

	render() {
		const { company } = this.props;
		return (
			<div className='profile-container'>
				<div className='dp'>
					<div className='profile-picture'>
						<img
							src={`../assets/${company.Company_Image}`}
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
										src={`../assets/${company.Company_Image}`}
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
								<button onClick={(e) => this.handleSave(e)}>
									Save
								</button>
							</div>
						) : (
							""
						)}
						<p>Click the camera icon to toggle file picker on and off</p>
					</form>
				) : (
					""
				)}
				<h2>{company.Company_Name}</h2>
			</div>
		);
	}
}

export default Emp_DP;
