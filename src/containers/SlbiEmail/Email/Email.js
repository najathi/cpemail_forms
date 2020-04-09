import React, { useState, useEffect } from 'react';
import { MDBRow } from 'mdbreact';

import CreateBulk from './CreateBulk/CreateBulk';
import EmailCard from '../Email/EmailCard/EmailCard';
import './Email.css';

const Email = props => {

	const [emailAddress, setEmailAddress] = useState([]);

	const addEmailHandler = (email) => {
		let emailObj = { Email: email, Password: 'slbi@2020', Quota: '' };
		setEmailAddress(emailAddress.concat(emailObj));
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
			<CreateBulk addedEmail={addEmailHandler} />
			{emailAddress.length >= 1 ? <EmailCard className="card EmailCard" email={emailAddress} deleteEmail={deleteHandler} /> : ''}
		</MDBRow>
	);

}

export default Email;