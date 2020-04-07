import React, { useState, useEffect } from 'react';
import { MDBCol } from 'mdbreact';
import axios from 'axios';

import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';

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

	useEffect(() => {
		const url = 'http://slbi.lk/rest-api/emailAccounts2.php';
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
	});

	const resetFormInput = () => {
		setEmailForm(emailForm);
	}

	const emailAddedHandler = event => {
		event.preventDefault();
		setLoading(true);
		const formData = {};
		for (let formElementIdentifier in emailForm) {
			formData[formElementIdentifier] = emailForm[formElementIdentifier].value.trim();
		}
		props.addedEmail(formData.email + formData.designation + '@slbi.lk');
		setLoading(false);
		resetFormInput();
	}

	const checkValidity = (value, rules) => {
		let isValid = true;

		const arrEmails = [...emails];

		let simple;

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

		console.log(simple);

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
			<Button btnType="Default" color="indigo" disabled={!formIsValid}>Add Email</Button>
		</form>);

	if (loading) {
		form = <Spinner />
	}

	return (
		<MDBCol lg="12">
			<MDBCol md="6">
				<div style={{ padding: '2rem', textAlign: 'left' }}>
					{form}
				</div>
			</MDBCol>
		</MDBCol>
	);

}

export default CreateEmail;