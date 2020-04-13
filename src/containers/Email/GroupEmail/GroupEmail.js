import React, { useState } from 'react';
import { MDBRow } from 'mdbreact';

import CreateGroup from './CreateGroup/CreateGroup';
import EmailPreview from './CreateGroup/EmailPreview/EmailPreview';

const GroupEmail = props => {

	const [emailAddress, setEmailAddress] = useState([]);

	const previewHandler = email => {
		const emailObj = email.map(mail => {
			return { email: mail, password: 'slbi@2020' };
		});
		console.log(emailObj);
		setEmailAddress(emailAddress.concat(emailObj));
	}

	const deleteHandler = (index, e) => {
		const emailAdd = [...emailAddress];
		emailAdd.splice(index, 1);
		setEmailAddress(emailAdd);
		console.log('deleted');
		console.log(emailAddress);
	}

	const resetAllHandler = () => {
		setEmailAddress([]);
	}

	const clearArrayHandler = () => {
		setEmailAddress([]);
	}

	let EmailPreviewCmp = '';
	if (emailAddress.length >= 1) {
		EmailPreviewCmp = <EmailPreview email={emailAddress} deleteEmail={deleteHandler} onArrClear={clearArrayHandler} />;
	}

	return (
		<MDBRow>
			<CreateGroup preview={previewHandler} onReset={resetAllHandler} email={emailAddress} />
			{EmailPreviewCmp}
		</MDBRow>
	);
}

export default GroupEmail;