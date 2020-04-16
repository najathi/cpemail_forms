import React, { useState, useEffect } from 'react';
import { MDBCol, MDBBtn } from 'mdbreact';
import axios from '../../../../axios-emails';

import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
// import Spinner from '../../../../components/UI/Spinner/Spinner';
// import Alert from '../../../../components/UI/Alert/Alert';
import './CreateGroup.css';

const CreateGroup = props => {

	const [emailForm, setEmailForm] = useState({
		email: {
			label: 'Full Names',
			elementType: 'textarea',
			elementConfig: {
				type: 'text',
				placeholder: 'Enter Full Names',
			},
			value: '',
			validation: {
				required: true,
				filter: true,
			},
			errorMsg: '',
			valid: false,
			touched: false
		},
		designation: {
			label: 'Designation',
			elementType: 'select',
			elementConfig: {
				options: [
					{ value: '.sr', displayValue: 'Seller / Product Introducer' },
					{ value: '.adm', displayValue: 'Associate Manager' },
					{ value: '.am', displayValue: 'Area Manager' },
					{ value: '.asdm', displayValue: 'Associate District Manager' },
					{ value: '.dm', displayValue: 'District Manager' },
					{ value: '.adtr', displayValue: 'Associate Director' },
					{ value: '.dtr', displayValue: 'Director' },
					{ value: '.cf', displayValue: 'Co-Founder' },
				]
			},
			value: '.sr', // default Value
			validation: {},
			valid: true
		},
	});
	const [formIsValid, setFormIsValid] = useState(false);
	const [emails, setEmails] = useState([]);
	// const [loading, setLoading] = useState(false);
	const [formErrors, setFormErrors] = useState({
		email: "",
	});
	// const [success, setSuccess] = useState(false);
	// const [danger, setDanger] = useState(false);
	const [isPreview, setIsPreview] = useState(false);

	useEffect(() => {
		const url = '/emails.php';
		axios.get(url).then(response => response.data)
			.then((data) => {
				const emails = data.map(responseEmail => {
					const atFind = responseEmail.indexOf('@');
					return responseEmail.slice(0, atFind);
				}).map(filteredEmail => {
					const dotFind = filteredEmail.lastIndexOf('.');
					return filteredEmail.slice(0, dotFind);
				});
				setEmails(emails);
			}).catch(error => console.log(error));
	}, [emailForm.email.value, emailForm.designation.value]);

	const resetFormInput = () => {
		setEmailForm({
			email: {
				label: 'Full Names',
				elementType: 'textarea',
				elementConfig: {
					type: 'text',
					placeholder: 'Enter Full Names',
				},
				value: '',
				validation: {
					required: true,
					filter: true,
				},
				errorMsg: '',
				valid: false,
				touched: false
			},
			designation: {
				label: 'Designation',
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: '.sr', displayValue: 'Seller / Product Introducer' },
						{ value: '.adm', displayValue: 'Associate Manager' },
						{ value: '.am', displayValue: 'Area Manager' },
						{ value: '.asdm', displayValue: 'Associate District Manager' },
						{ value: '.dm', displayValue: 'District Manager' },
						{ value: '.adtr', displayValue: 'Associate Director' },
						{ value: '.dtr', displayValue: 'Director' },
						{ value: '.cf', displayValue: 'Co-Founder' },
					]
				},
				value: '.sr', // default Value
				validation: {},
				valid: true
			},
		});
	}

	const resetHandler = () => {
		props.onReset();
		resetFormInput();
	}

	const emailSubmitHandler = event => {
		event.preventDefault();
		// setLoading(true);
		const payload = {
			email: props.email
		}

		axios.post('/create-group-emails.php', payload, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
	}

	const onPreviewHandler = event => {
		if (emailForm.email.value === '') {
			return;
		}
		props.preview(emailForm.email.value.split('\n').map(line => line.replace(/\s/g, '').replace(/[^a-zA-Z ]/g, "").toLowerCase().trim() + emailForm.designation.value + '@slbi.lk'));
		setIsPreview(true);
	}

	const checkValidity = (value, rules) => {
		let isValid = true;

		const arrEmails = [...emails];

		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.filter) {
			value.split('\n').map(mail => {
				isValid = arrEmails.indexOf(mail) === -1 && isValid;
				return [];
			});
		}

		if (rules.filter) {
			isValid = value.includes('@') === false && isValid;
		}

		if (!isValid) {
			setFormErrors({ email: 'Invalid Email Name' });
		}

		return isValid;
	}

	const inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = { ...emailForm };

		const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}

		setEmailForm(updatedOrderForm);
		setFormIsValid(formIsValid);

		if (formIsValid) {
			setFormErrors({ email: '' });
		}
	}

	const formElementArray = [];
	for (let key in emailForm) {
		formElementArray.push({
			id: key,
			config: emailForm[key],
			name: key
		});
	}

	let form = (
		<div className="form-container">
			<form onSubmit={emailSubmitHandler}>
				{formElementArray.map(formElement => (
					<Input
						key={formElement.id}
						name={formElement.name}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						label={formElement.config.label}
						value={formElement.config.value.toLowerCase()}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						formErrors={formErrors}
						changed={(event) => inputChangedHandler(event, formElement.id)} />
				))}
				<MDBBtn gradient="peach" style={{ marginRight: '1rem', borderRadius: '20px' }} onClick={onPreviewHandler}>Preview</MDBBtn>
				{isPreview && <Button btnType="Default" disabled={!formIsValid} style={{ marginBottom: '3rem', marginRight: '1rem' }}>Submit Email</Button>}
				{isPreview && <MDBBtn color="dark" outline style={{ marginLeft: '1rem', borderRadius: '20px' }} onClick={resetHandler}>RESET</MDBBtn>}
			</form>
		</div>);

	// if (loading) {
	// 	form = <Spinner />;
	// }

	// let alertMessage = null;
	// if (success) {
	// 	alertMessage = <Alert alertType="success" text="Email Account was created" />;
	// } else if (danger) {
	// 	alertMessage = <Alert alertType="danger" text="Unable to create email account" />;
	// }

	return (
		<MDBCol lg="12">
			<MDBCol md="6">
				<div style={{ padding: '2rem 1rem', textAlign: 'left' }}>
					{/* {alertMessage} */}
					<h4 style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Create Group Email Accounts</h4>
					{form}
					<MDBCol style={{ marginTop: '2rem' }}>
					</MDBCol>
				</div>
			</MDBCol>
		</MDBCol >
	);
}

export default CreateGroup;