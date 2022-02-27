import React from "react";
import "./Modal.css";
import CloseIcon from "./Images/CloseIcon.png";
import { useNavigate } from "react-router-dom";

const Modal = (props) => {
	const navigate = useNavigate();
	return (
		<div className='modal-container'>
			<div className='overlay-style' onClick={props.close} />
			<div className='modal-style'>
				<div className='modal-header'>
					<h3 className='modal-sub-text'>{props.headText}</h3>
					<div className='modal-close'>
						<img
							className='closeIcon'
							src={CloseIcon}
							alt='Close'
							onClick={props.close}
						/>
					</div>
				</div>
				<h1 className='modal-text'>{props.modalText}</h1>
				<div className='modal-buttons'>
					<button className='modal-button-back' onClick={props.close}>
						{props.closeText}
					</button>
					<button
						className='modal-button-send'
						onClick={(e) => {
							props.confirm(e);
							navigate(props.path);
						}}>
						{props.confirmText}
					</button>
				</div>
			</div>
		</div>
	);
};

Modal.defaultProps = {
	path: "/admin/dashboard",
};

export default Modal;
