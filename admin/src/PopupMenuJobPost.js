import React, { useState } from "react";
import AdminResources from "./AdminResources";
import CloseIcon from "./Images/CloseIcon.png";
import "./PopupMenu.css";

function PopupMenu({
	setIsPopupMenuOpen,
	setLocation,
	setStatus,
	setSort,
	location,
	status,
	sort,
}) {
	const [selectedLocation, setSelectedLocation] = useState(location);
	const [selectedStatus, setSelectedStatus] = useState(status);
	const [selectedSort, setSelectedSort] = useState(sort);

	function handleContinue() {
		setIsPopupMenuOpen(false);
		setLocation(selectedLocation);
		setStatus(selectedStatus);
		setSort(selectedSort);
	}

	const allBarangays = AdminResources.getBarangay();
	let barangay = allBarangays.map((b) => {
		return (
			<option key={b} value={b}>
				{b}
			</option>
		);
	});

	return (
		<div className='modal-container'>
			<div
				className='overlay-style'
				onClick={() => setIsPopupMenuOpen(false)}
			/>
			<div className='modal-style'>
				<div className='modal-header'>
					<h3 className='modal-sub-text'>More Options</h3>
					<div className='modal-close'>
						<img
							className='closeIcon'
							src={CloseIcon}
							alt='Close'
							onClick={() => setIsPopupMenuOpen(false)}
						/>
					</div>
				</div>
				{/* <h1 className='modal-text'>Sample Text</h1> */}
				<div className='modal-content-container'>
					<div className='content-choices'>
						<div className='left-content'>
							<h4>Location:</h4>
						</div>
						<div className='right-content'>
							<select
								value={selectedLocation}
								onChange={(e) => setSelectedLocation(e.target.value)}>
								<option value=''>All over Catarman</option>
								{barangay}
							</select>
						</div>
					</div>
					<div className='content-choices'>
						<div className='left-content'>
							<h4>Job Post Status:</h4>
						</div>
						<div className='right-content'>
							<select
								value={selectedStatus}
								onChange={(e) => setSelectedStatus(e.target.value)}>
								<option value='Active'>Active</option>
								<option value='Closed'>Closed</option>
								<option value='All'>All Job Posts</option>
							</select>
						</div>
					</div>
					<div className='content-choices'>
						<div className='left-content'>
							<h4>Sort by Time:</h4>
						</div>
						<div className='right-content'>
							<select
								value={selectedSort}
								onChange={(e) => setSelectedSort(e.target.value)}>
								<option value='Most Recent'>Most Recent</option>
								<option value='Old Posts First'>Old Posts First</option>
							</select>
						</div>
					</div>
				</div>
				<div className='modal-buttons'>
					{/* <button className='modal-button-back'>Cancel</button> */}
					<button className='modal-button-send' onClick={handleContinue}>
						OK
					</button>
				</div>
			</div>
		</div>
	);
}

export default PopupMenu;
