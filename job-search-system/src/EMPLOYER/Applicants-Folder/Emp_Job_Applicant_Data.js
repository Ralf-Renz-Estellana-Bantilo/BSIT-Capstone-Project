import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LeftArrow from "../../Images/LeftArrow.png";
import Modal from "../../JOBSEEKER/Home-Folder/Modal";
import Resources from "../../Resources";
import "./Emp_Job_Applicant_Data.css";

const Emp_Job_Applicant_Data = ({
	companyJobPost,
	addEmployerFeedBack,
	updateCandidateStatus,
	jobApplicantData,
	employerFeedback,
	darkTheme,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [isRow2Open, setIsRow2Open] = useState(false);
	const [row1Text, setRow1Text] = useState("");
	const [row2Text, setRow2Text] = useState("");
	const [row3Text, setRow3Text] = useState("");
	const month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const day = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
		22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
	];
	const hour = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	const minute = ["00", "15", "30", "45"];
	const [selectedMonth, setSelectedMonth] = useState("");
	const [selectedDay, setSelectedDay] = useState("");
	const [selectedYear, setSelectedYear] = useState("");
	const [selectedHour, setSelectedHour] = useState("");
	const [selectedMinute, setSelectedMinute] = useState("");
	const [selectedAMPM, setSelectedAMPM] = useState("");
	const [activeButton, setActiveButton] = useState("");
	const [valid, setValid] = useState(false);
	const [height, setHeight] = useState(0);
	const ref = useRef(null);

	const viewModal = () => {
		setIsModalOpen(true);
	};

	const onCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleSendResponse = async (applicant) => {
		try {
			const text = `${row1Text}` + `${row2Text}` + `${row3Text}`;
			let jobPost = companyJobPost.filter(
				(jobPost) => jobPost.JobID === jobApplicantData.JobID
			);

			let status = "";

			if (activeButton === "Decline") {
				status = "Declined";
			} else if (activeButton === "Meet") {
				status = "Meet";
			} else if (activeButton === "Hire") {
				status = "Hired";
			}

			const feedback = {
				ApplicantID: jobApplicantData.ApplicantID,
				CompanyID: jobPost[0].CompanyID,
				JobID: jobPost[0].JobID,
				Company_Image: jobPost[0].Company_Image,
				Company_Name: jobPost[0].Company_Name,
				Job_Title: jobPost[0].Job_Title,
				Company_Address: jobPost[0].Company_Address,
				Minutes: new Date().getMinutes(),
				Hour: new Date().getHours(),
				Day: new Date().getDate(),
				Month: new Date().getMonth() + 1,
				Year: new Date().getFullYear(),
				Date_Replied: new Date(),
				Application_Status: status,
				Status: "New",
				Type: "feedback",
				Message: text,
			};

			await addEmployerFeedBack(feedback);
			await updateCandidateStatus(
				jobApplicantData.ApplicantID,
				jobApplicantData.JobID,
				status
			);
		} catch (error) {
			console.log("Emp_Job_Applicant_Data", error);
		}
	};

	const handleDecline = (name) => {
		setRow1Text(
			`Good day, ${name}! I would like to inform you that I have looked through your job application, and I am sorry to tell you that your job application is declined, better luck next time😉`
		);
		setRow2Text("");
		setRow3Text("");
		setIsRow2Open(false);
		setActiveButton("Decline");
	};

	const handleMeet = (name) => {
		setRow1Text(
			`Good day, ${name}! I would like to inform you that I have looked through your job application, and I am curious about your skills and abilities, I would like to an interview to meet you in person... I want you to be here in my address on this date: `
		);
		setRow2Text(row2Text);
		setRow3Text(row3Text);
		setIsRow2Open(true);
		setActiveButton("Meet");
	};

	const handleHire = (name) => {
		setRow1Text(
			`Good day, ${name}! I would like to inform you that I have looked through your job application, and I am here to tell you that YOU ARE HIRED! CONGRATULATIONS! I want you to be here in my address on this date: `
		);
		setRow2Text(row2Text);
		setRow3Text(row3Text);
		setIsRow2Open(true);
		setActiveButton("Hire");
	};

	const handleChangeMonth = (e) => {
		setSelectedMonth(e.target.value);
		handleChangeDate();
	};

	const handleChangeDay = (e) => {
		setSelectedDay(e.target.value);
		handleChangeDate();
	};

	const handleChangeYear = (e) => {
		setSelectedYear(e.target.value);
		handleChangeDate();
	};

	const handleChangeHour = (e) => {
		setSelectedHour(e.target.value);
		handleChangeDate();
	};

	const handleChangeMinute = (e) => {
		setSelectedMinute(e.target.value);
		handleChangeDate();
	};

	const handleChangeAMPM = (e) => {
		setSelectedAMPM(e.target.value);
		handleChangeDate();
	};

	const handleChangeDate = () => {
		setRow2Text(`${selectedMonth} ` + `${selectedDay}, ` + `${selectedYear}`);
	};

	const handleChangeTime = () => {
		setRow3Text(` @ ${selectedHour}:${selectedMinute} ` + `${selectedAMPM}`);
	};

	useEffect(() => {
		handleChangeDate();
		handleChangeTime();

		if (
			selectedMonth === "" &&
			selectedDay === "" &&
			selectedYear === "" &&
			selectedHour === "" &&
			selectedMinute === "" &&
			selectedAMPM === ""
		) {
			setRow2Text("");
			setRow3Text("");
		}

		if (
			row1Text === "" ||
			selectedMonth === "" ||
			selectedDay === "" ||
			selectedYear === "" ||
			selectedHour === "" ||
			selectedMinute === "" ||
			selectedAMPM === ""
		) {
			setValid(false);
		} else {
			setValid(true);
		}

		if (activeButton === "Decline") {
			setRow2Text("");
			setRow3Text("");
			setValid(true);
		}
	}, [
		selectedMonth,
		selectedDay,
		selectedYear,
		selectedHour,
		selectedMinute,
		selectedAMPM,
		activeButton,
	]);

	useEffect(() => {
		window.scrollTo(0, 0);
		setHeight(ref.current.clientHeight);
	}, []);

	let jobPost = companyJobPost.filter(
		(jobPost) => jobPost.JobID === jobApplicantData.JobID
	);
	let message = "";

	for (let a = 0; a < employerFeedback.length; a++) {
		if (
			employerFeedback[a].ApplicantID === jobApplicantData.ApplicantID &&
			employerFeedback[a].Type === "feedback" &&
			employerFeedback[a].JobID === jobApplicantData.JobID
		) {
			message = employerFeedback[a].Message;
		}
	}

	return (
		<div className='job-applicant-data-container'>
			<div className='applicant-data-container'>
				<div className='job-title-header' ref={ref}>
					<Link to='/employer/applicants'>
						<img
							src={LeftArrow}
							alt='Back'
							style={
								darkTheme
									? { filter: "brightness(1)" }
									: { filter: "brightness(0.3)" }
							}
						/>
					</Link>
					<div className='job-title'>
						<h1>{jobApplicantData.Job_Title}</h1>
						<p>{jobPost[0].Category}</p>
					</div>
				</div>

				<div style={{ marginTop: `${height + 10}px` }} />

				<div className='applicant-dp'>
					<div className='applicant-profile'>
						<img
							src={`../../assets/${jobApplicantData.User_Image}`}
							alt='Applicant Profile'
							style={{ height: "150px" }}
						/>
					</div>
					<h2>{`${jobApplicantData.First_Name} ${jobApplicantData.Middle_Name} ${jobApplicantData.Last_Name}`}</h2>
					<p>
						{Resources.getCurrentAge(
							jobApplicantData.B_Month,
							jobApplicantData.B_Day,
							jobApplicantData.B_Year
						)}{" "}
						| {`${jobApplicantData.Sex}`}
					</p>

					{jobApplicantData.Candidate_Status === "Meet" ? (
						<p
							style={{
								textAlign: "center",
								padding: "10px",
								color: "white",
								borderRadius: "5px",
								background: "linear-gradient(20deg, #00b2ff, #006aff)",
								fontSize: "14px",
								// border: "1px solid grey",
							}}>
							Scheduled for an Interview
						</p>
					) : jobApplicantData.Candidate_Status === "Hired" ? (
						<p
							style={{
								textAlign: "center",
								padding: "10px",
								color: "#131313",
								borderRadius: "5px",
								background: "linear-gradient(20deg, #00f33d, #88ff00)",
								fontSize: "14px",
								// border: "1px solid grey",
							}}>
							Hired
						</p>
					) : jobApplicantData.Candidate_Status === "Declined" ? (
						<p
							style={{
								textAlign: "center",
								padding: "10px",
								color: "white",
								borderRadius: "5px",
								background: "linear-gradient(20deg, #ff004c, #ff7b00)",
								fontSize: "14px",
								// border: "1px solid grey",
							}}>
							Declined
						</p>
					) : (
						""
					)}
				</div>

				<div className='applicant-profile-info'>
					<div className='form'>
						<label>Home Address</label>
						<p>{jobApplicantData.Home_Address}</p>
					</div>
					<div className='form'>
						<label>Email Address</label>
						<p>{jobApplicantData.Email_Address}</p>
					</div>
					<div className='form'>
						<label>Contact Number</label>
						<p>{jobApplicantData.Contact_Number}</p>
					</div>
					<div className='form'>
						<label>Civil Status</label>
						<p>{jobApplicantData.Civil_Status}</p>
					</div>
					<div className='form'>
						<label>Educational Attainment</label>
						<p>{jobApplicantData.Educ_Attainment}</p>
					</div>
					<div className='form'>
						<label>Resume</label>
						{!jobApplicantData.Resume ? (
							<p className='resume-data'>n/a</p>
						) : (
							<Link
								to={`/pdf/${jobApplicantData.Resume}`}
								target='_blank'
								download>
								{jobApplicantData.Resume}
							</Link>
						)}
					</div>
				</div>

				{isModalOpen && (
					<Modal
						headText='Logout Confirmation'
						modalText={`Continue sending your response?`}
						confirmText='Continue'
						closeText='Cancel'
						close={onCloseModal}
						confirm={async () =>
							await handleSendResponse(jobApplicantData)
						}
						path='/employer/applicants'
					/>
				)}

				<div className='action'>
					<p>Select Action:</p>

					<div className='action-choices'>
						<button
							disabled={
								jobApplicantData.Candidate_Status === "Hired" ||
								jobApplicantData.Candidate_Status === "Meet" ||
								(jobApplicantData.Candidate_Status === "Declined" &&
									"disabled")
							}
							onClick={() => handleDecline(jobApplicantData.First_Name)}
							style={
								activeButton === "Decline"
									? {
											background:
												"linear-gradient(20deg, #ff004c, #ff7b00)",
									  }
									: jobApplicantData.Candidate_Status === "Hired" ||
									  jobApplicantData.Candidate_Status === "Meet" ||
									  jobApplicantData.Candidate_Status === "Declined"
									? { opacity: "0.3" }
									: {}
							}>
							Decline
						</button>
						<button
							disabled={
								jobApplicantData.Candidate_Status === "Hired" ||
								jobApplicantData.Candidate_Status === "Meet" ||
								(jobApplicantData.Candidate_Status === "Declined" &&
									"disabled")
							}
							style={
								activeButton === "Meet"
									? {
											background:
												"linear-gradient(20deg, #00b2ff, #006aff)",
									  }
									: jobApplicantData.Candidate_Status === "Hired" ||
									  jobApplicantData.Candidate_Status === "Meet" ||
									  jobApplicantData.Candidate_Status === "Declined"
									? { opacity: "0.3" }
									: {}
							}
							onClick={() => handleMeet(jobApplicantData.First_Name)}>
							Interview
						</button>
						<button
							disabled={
								jobApplicantData.Candidate_Status === "Hired" ||
								jobApplicantData.Candidate_Status === "Meet" ||
								(jobApplicantData.Candidate_Status === "Declined" &&
									"disabled")
							}
							style={
								activeButton === "Hire"
									? {
											background:
												"linear-gradient(20deg, #00f33d, #88ff00)",
									  }
									: jobApplicantData.Candidate_Status === "Hired" ||
									  jobApplicantData.Candidate_Status === "Meet" ||
									  jobApplicantData.Candidate_Status === "Declined"
									? { opacity: "0.3" }
									: {}
							}
							onClick={() => handleHire(jobApplicantData.First_Name)}>
							Hire
						</button>
					</div>

					{isRow2Open ? (
						<>
							{" "}
							<div className='action-choices'>
								<select
									defaultValue='default'
									onChange={(e) => {
										handleChangeMonth(e);
									}}>
									<option
										disabled='disabled'
										hidden='hidden'
										value='default'>
										Select Month
									</option>
									{month.map((mon) => {
										return (
											<option key={mon} value={mon}>
												{mon}
											</option>
										);
									})}
								</select>

								<select
									defaultValue='default'
									onChange={(e) => {
										handleChangeDay(e);
									}}>
									<option
										disabled='disabled'
										hidden='hidden'
										value='default'>
										Select Day
									</option>
									{day.map((d) => {
										return (
											<option key={d} value={d}>
												{d}
											</option>
										);
									})}
								</select>

								<select
									defaultValue='default'
									onChange={(e) => {
										handleChangeYear(e);
									}}>
									<option
										disabled='disabled'
										hidden='hidden'
										value='default'>
										Select Year
									</option>
									<option value={new Date().getFullYear()}>
										{new Date().getFullYear()}
									</option>
								</select>
							</div>
							<div className='action-choices'>
								<select
									defaultValue='default'
									onChange={(e) => {
										handleChangeHour(e);
									}}>
									<option
										disabled='disabled'
										hidden='hidden'
										value='default'>
										Select Hour
									</option>
									{hour.map((h) => {
										return (
											<option key={h} value={h}>
												{h}
											</option>
										);
									})}
								</select>

								<select
									defaultValue='default'
									onChange={(e) => {
										handleChangeMinute(e);
									}}>
									<option
										disabled='disabled'
										hidden='hidden'
										value='default'>
										Select Minute
									</option>
									{minute.map((min) => {
										return (
											<option key={min} value={min}>
												{min}
											</option>
										);
									})}
								</select>

								<select
									defaultValue='default'
									onChange={(e) => {
										handleChangeAMPM(e);
									}}>
									<option
										disabled='disabled'
										hidden='hidden'
										value='default'>
										AM / PM
									</option>
									<option value={"AM"}>AM</option>
									<option value={"PM"}>PM</option>
								</select>
							</div>{" "}
						</>
					) : (
						""
					)}

					<textarea
						disabled='disabled'
						value={
							jobApplicantData.Candidate_Status === "Hired" ||
							jobApplicantData.Candidate_Status === "Meet" ||
							jobApplicantData.Candidate_Status === "Declined"
								? message
								: `${row1Text}` + `${row2Text}` + `${row3Text}`
						}
						placeholder='Choose your action above...'
						rows='7'
					/>
					<div className='action-buttons'>
						<button
							onClick={viewModal}
							disabled={valid === false ? "disabled" : ""}
							style={
								valid === false ? { opacity: "0.3" } : { opacity: "1" }
							}>
							{jobApplicantData.Candidate_Status === "Hired" ||
							jobApplicantData.Candidate_Status === "Meet" ||
							jobApplicantData.Candidate_Status === "Declined"
								? "Response Sent"
								: "Send Response"}
						</button>
					</div>

					<div className='more-info'>
						<span>
							Try sending an email to your applicant if you still have
							something to say...
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Emp_Job_Applicant_Data;
