import React, { useRef } from "react";
import emailjs from "emailjs-com";

const Contact = ({ handleChangeLink }) => {
	const form = useRef();
	const sendEmail = (e) => {
		e.preventDefault();
		try {
			emailjs
				.sendForm(
					"gmail",
					"template_0kdw8xu",
					form.current,
					"user_d4MCLJciZKPbKaM472IEi"
				)
				.then(
					(result) => {
						// console.log(result.text);
					},
					(error) => {
						alert(error.text);
					}
				);
			alert("Message sent!");
			handleChangeLink("Account");
		} catch (error) {
			alert(error);
		}
	};
	return (
		<div className='outside-link'>
			<div className='contact-container'>
				<form
					ref={form}
					className='contact-form'
					onSubmit={(e) => sendEmail(e)}>
					<div className='contact-form-header'>
						<h3>Contact Us</h3>
					</div>
					<div className='contact'>
						<input
							autoFocus
							type='text'
							placeholder='Enter your name'
							name='from_name'
						/>
						<input
							type='email'
							placeholder='Enter your email address'
							name='from_email'
						/>
						<textarea
							cols='30'
							rows='5'
							placeholder='Enter your Message'
							name='message'></textarea>
						<button onClick={(e) => sendEmail(e)}>Send Message</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Contact;
