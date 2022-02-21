// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { withRouter } from "react-router";

// export class Modal extends Component {
// 	render() {
// 		return (
// 			<div className='modal-container'>
// 				<div className='overlay-style' onClick={this.props.close} />
// 				<div className='modal-style'>
// 					<div className='modal-header'>
// 						<h3 className='modal-sub-text'>{this.props.headText}</h3>
// 						<div className='modal-close'>
// 							<img
// 								className='closeIcon'
// 								src={CloseIcon}
// 								alt='Close'
// 								onClick={this.props.close}
// 							/>
// 						</div>
// 					</div>
// 					<h1 className='modal-text'>{this.props.modalText}</h1>
// 					<div className='modal-buttons'>
// 						<button
// 							className='modal-button-back'
// 							onClick={this.props.close}>
// 							{this.props.closeText}
// 						</button>
// 						<button
// 							className='modal-button-send'
// 							onClick={(e) => {
// 								this.props.confirm(e);
// 								this.props.history.push(this.props.path);
// 							}}>
// 							{this.props.confirmText}
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }

// Modal.defaultProps = {
// 	path: "/admin/dashboard",
// };

// export default withRouter(Modal);

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
