import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Modal.css";
import CloseIcon from "./Images/CloseIcon.png";

export class Modal extends Component {
	render() {
		return (
			<div className='modal-container'>
				<div className='overlay-style' onClick={this.props.close} />
				<div className='modal-style'>
					<div className='modal-header'>
						<h3 className='modal-sub-text'>{this.props.headText}</h3>
						<div className='modal-close'>
							<img
								className='closeIcon'
								src={CloseIcon}
								alt='Close'
								onClick={this.props.close}
							/>
						</div>
					</div>
					<h1 className='modal-text'>{this.props.modalText}</h1>
					<div className='modal-buttons'>
						<button
							className='modal-button-back'
							onClick={this.props.close}>
							{this.props.closeText}
						</button>
						<button
							className='modal-button-send'
							onClick={(e) => {
								this.props.confirm(e);
							}}>
							<Link to={this.props.path}>{this.props.confirmText}</Link>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

Modal.defaultProps = {
	path: "/admin/dashboard",
};

export default Modal;
