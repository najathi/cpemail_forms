import React, { useState, useEffect } from 'react';
import { MDBCol, MDBBtn } from 'mdbreact';
import axios from '../../../../axios-emails';
import Clipboard from 'react-clipboard.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Alert from '../../../../components/UI/Alert/Alert';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import ClipboardButton from 'react-clipboard.js';

const CreateEmail = props => {

	const [emailForm, setEmailForm] = useState({
		email: {
			label: 'E-Mail Name',
			elementType: 'input-group',
			elementConfig: {
				type: 'text',
				placeholder: 'Your E-Mail Name',
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
					{ value: '.am', displayValue: 'Associate Manager' },
					{ value: '.adm', displayValue: 'Area Manager' },
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
	const [loading, setLoading] = useState(false);
	const [formErrors, setFormErrors] = useState({
		email: "",
	});
	const [success, setSuccess] = useState(false);
	const [danger, setDanger] = useState(false);
	const [emailCopy, setEmailCopy] = useState('');
	const [copy, setCopy] = useState(false);

	useEffect(() => {
		// const url = '/emails.php';
		const url = 'http://email.slbi.lk/api/emails.php';
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
	}, [emailForm]);

	const resetFormInput = () => {
		setEmailForm({
			email: {
				label: 'E-Mail Name',
				elementType: 'input-group',
				elementConfig: {
					type: 'text',
					placeholder: 'Your E-Mail Name',
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
						{ value: '.am', displayValue: 'Associate Manager' },
						{ value: '.adm', displayValue: 'Area Manager' },
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

	const emailAddedHandler = event => {
		event.preventDefault();
		setLoading(true);
		const formData = {};
		for (let formElementIdentifier in emailForm) {
			formData[formElementIdentifier] = emailForm[formElementIdentifier].value.trim();
		}
		axios.post('/create-email.php', formData, {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
			.then(response => {
				setLoading(false);
				console.log(response);
				setEmailCopy(response.data.email);
				setSuccess(true);
				setDanger(false);
				resetFormInput();
				setTimeout(() => {
					setSuccess(false);
				}, 10000);
				// props.history.push('/');
			})
			.catch(error => {
				setLoading(false);
				console.log(error);
				setDanger(true);
				setSuccess(false);
				setTimeout(() => {
					setDanger(false);
				}, 10000);
			});
	}

	// console.log(success);
	// console.log(danger);

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
			isValid = arrEmails.indexOf(value) === -1 && isValid;
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

		console.log(event.target);

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

		console.log(emailForm);
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
		<form onSubmit={emailAddedHandler}>
			{formElementArray.map(formElement => (
				<Input
					key={formElement.id}
					name={formElement.name}
					elementType={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					label={formElement.config.label}
					value={formElement.config.value}
					invalid={!formElement.config.valid}
					shouldValidate={formElement.config.validation}
					touched={formElement.config.touched}
					formErrors={formErrors}
					changed={(event) => inputChangedHandler(event, formElement.id)} />
			))}
			<Button btnType="Default" color="indigo" disabled={!formIsValid} style={{ marginBottom: '1.5rem' }}>Add Email</Button>
		</form>);

	if (loading) {
		form = <Spinner />
	}

	let alertMessage = null;
	if (success) {
		alertMessage = <Alert alertType="success" text="Email Account was created" />;
	} else if (danger) {
		alertMessage = <Alert alertType="danger" text="Unable to create email account" />;
	}

	return (
		<MDBCol lg="12">
			<MDBCol md="6">
				<div style={{ padding: '2rem', textAlign: 'left' }}>
					{alertMessage}
					<h4 style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Create an Email Account</h4>
					{form}

					{emailCopy !== '' && <Aux>
						<span style={{ marginTop: '3rem', marginBottom: '2rem', marginRight: '2rem' }}>{emailCopy}</span>
						<CopyToClipboard text={emailCopy} button-title="Copy">
							<MDBBtn color="info" onClick={() => setCopy(true)}>{copy ? 'Copied' : 'Copy text'}</MDBBtn>
						</CopyToClipboard>
					</Aux>}
				</div>
			</MDBCol>
		</MDBCol>
	);

}

export default CreateEmail;