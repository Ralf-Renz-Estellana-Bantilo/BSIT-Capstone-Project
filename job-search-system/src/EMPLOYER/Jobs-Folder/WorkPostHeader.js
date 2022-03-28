import axios from "axios";
import { useEffect, useState } from "react";
import AppConfiguration from "../../AppConfiguration";
import "./WorkPostHeader.css";

const WorkPostHeader = ({
	name,
	onAdd,
	showAdd,
	currentUser,
	resetTargetJobPost,
	toggle,
}) => {
	const [company, setCompany] = useState([]);

	const toggleView = () => {
		onAdd();
		resetTargetJobPost();
		toggle();
	};

	useEffect(() => {
		// Fetching Company Data
		axios
			.post(`${AppConfiguration.url()}/api/read-company`, {
				userID: currentUser.UserID,
			})
			.then(async (response) => {
				if (response.data.length === 1) {
					setCompany(response.data[0]);
				} else {
					console.log(`Error fetching information...`);
				}
			});
	}, []);

	return (
		<div className='user-post'>
			<div className='user-profile'>
				<img
					src={`${AppConfiguration.url()}/assets/images/${
						company.Company_Image
					}`}
					alt='User'
					title={name}
				/>
			</div>

			<div className='post-button'>
				<button onClick={toggleView}>
					{showAdd
						? `Click to toggle job vacancy form`
						: `Click to close job vacancy form`}
				</button>
			</div>
		</div>
	);
};

export default WorkPostHeader;
