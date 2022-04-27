import React from "react";

const RegistrationForm = (props) => {
	return (
		<div className='employer-register-company-container'>
			<div className='employer-register-overlay' />
			<form
				className='register-form'
				onSubmit={(e) => props.handleCreateCompanyData(e)}>
				<h3 onClick={props.closeModal}>Establishment Registration Form</h3>
				<div className='register-fields'>
					<div className='register-field'>
						<label>Business Establishment Name:</label>
						<input
							autoFocus
							type='text'
							placeholder='Set Establishment Name'
							onChange={(e) =>
								props.handleChange(e, "comp_stablismentName")
							}
						/>
					</div>
					<div className='register-field'>
						<label>Acronym/Abbreviation:</label>
						<div className='acronym-container'>
							<input
								type='text'
								placeholder='Set Establishment Acronym/Abbreviation'
								onChange={(e) => props.handleChange(e, "comp_acronym")}
							/>
							<div className='acronym'>
								<input
									type='checkbox'
									name='acronym'
									checked={props.hasAcronym ? "checked" : ""}
									onChange={props.handleAcronym}
								/>
								<label>(n/a)</label>
							</div>
						</div>
					</div>
					<div className='register-field'>
						<label>Employer Type:</label>
						<select
							defaultValue=''
							onChange={(e) => props.handleChange(e, "comp_type")}>
							<option disabled='disabled' hidden='hidden' value=''>
								Select Employer Type
							</option>
							<option value='Government'>Government</option>
							<option value='Recruitment & Placement Agency'>
								Recruitment & Placement Agency
							</option>
							<option value='Private'>Private</option>
							<option value='Licenced Recruitment Agency (Overseas)'>
								Licenced Recruitment Agency (Overseas)
							</option>
							<option value='DO 174-17. Subcontractor'>
								DO 174-17. Subcontractor
							</option>
						</select>
					</div>
					<div className='register-field'>
						<label>Total Work Force:</label>
						<select
							defaultValue=''
							onChange={(e) => props.handleChange(e, "comp_workForce")}>
							<option disabled='disabled' hidden='hidden' value=''>
								Select Total Work Force
							</option>
							<option value='Micro (1-9)'>Micro (1-9)</option>
							<option value='Small (10-99)'>Small (10-99)</option>
							<option value='Medium (100-199)'>Medium (100-199)</option>
							<option value='Large (200 and up)'>
								Large (200 and up)
							</option>
						</select>
					</div>
					<div className='register-field'>
						<label>Business Establishment Location:</label>
						<input
							type='text'
							placeholder='Input Street'
							onChange={(e) => props.handleChange(e, "comp_street")}
							style={{ marginBottom: "2px" }}
						/>
						<select
							defaultValue=''
							onChange={(e) => props.handleChange(e, "comp_zone")}>
							<option disabled='disabled' hidden='hidden' value=''>
								Select Zone
							</option>
							<option value='Zone 1'>Zone 1</option>
							<option value='Zone 2'>Zone 2</option>
							<option value='Zone 3'>Zone 3</option>
							<option value='Zone 4'>Zone 4</option>
							<option value='Zone 5'>Zone 5</option>
							<option value='Zone 6'>Zone 6</option>
							<option value='Not Specified'>Not Specified</option>
						</select>
						<select
							defaultValue=''
							onChange={(e) => props.handleChange(e, "comp_barangay")}>
							<option disabled='disabled' hidden='hidden' value=''>
								Select Barangay
							</option>
							{props.barangayResources}
						</select>
					</div>
					<div className='register-field'>
						<label>Contact Number:</label>
						<input
							type='number'
							placeholder='Enter Contact Number'
							onChange={(e) =>
								props.handleChange(e, "comp_contactNumber")
							}
						/>
					</div>
					<div className='register-field'>
						<label>Email Address:</label>
						<input
							type='email'
							placeholder='Enter Email Address'
							onChange={(e) =>
								props.handleChange(e, "comp_emailAddress")
							}
						/>
					</div>
					<div className='register-field'>
						<label>Business Establishment Description:</label>
						<textarea
							placeholder='Describe what your business does..'
							onChange={(e) => props.handleChange(e, "comp_description")}
							rows='5'
						/>
					</div>
					<div className='register-field'>
						<label>Establishment Photo:</label>
						<input
							type='file'
							onChange={props.handleFileChange}
							accept='image/jpeg, image/png'
						/>
					</div>
					<button
						onClick={(e) => props.handleCreateCompanyData(e)}
						style={
							props.isUpdateButtonEnable
								? { opacity: "1" }
								: { opacity: "0.3" }
						}
						disabled={props.isUpdateButtonEnable ? "" : "disabled"}>
						Register
					</button>
				</div>
			</form>
		</div>
	);
};

export default RegistrationForm;
