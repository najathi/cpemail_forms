import React, { useState, useEffect } from 'react';
import { MDBRow } from 'mdbreact';

import CreateCsv from '../Email/CreateCsv/CreateCsv';
import EmailCard from '../Email/EmailCard/EmailCard';
import './Email.css';

const Email = props => {

	const [emailAddress, setEmailAddress] = useState([]);

	const addEmailHandler = (email) => {
		let emailArr = { Email: email, Password: 'slbi@2020', Quota: '' };
		setEmailAddress(emailAddress.concat(emailArr));
	}

	const deleteHandler = (index, e) => {
		const emailAdd = [...emailAddress];
		emailAdd.splice(index, 1);
		setEmailAddress(emailAdd);
		console.log('deleted');
		console.log(emailAddress);
	}

	useEffect(() => {
		console.log(emailAddress);
	}, [emailAddress]);

	return (
		<MDBRow>
			<CreateCsv addedEmail={addEmailHandler} />
			{emailAddress.length >= 1 ? <EmailCard className="card EmailCard" email={emailAddress} deleteEmail={deleteHandler} /> : ''}
		</MDBRow>
	);

}

export default Email;