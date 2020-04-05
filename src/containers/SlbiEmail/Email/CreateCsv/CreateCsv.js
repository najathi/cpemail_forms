import React, { useState } from 'react';
import { MDBCol, MDBBtn, MDBInputGroup } from 'mdbreact';

const CreateCSV = props => {

	const [username, setUsername] = useState('');
	const [designation, setDesignation] = useState('');

	return (
		<MDBCol lg="12">
			<MDBCol md="6">
				<div className="createForm" style={{ padding: '2rem', textAlign: 'left' }}>
					<form>
						<p className="h4 text-left mb-4" style={{ marginBottom: '4rem' }}>Create Bulk Email Accounts</p>
						<label className="grey-text">
							Username of Email Address
        		</label>
						<MDBInputGroup value={username} containerClassName="mb-4" append="@slbi.lk" hint="Recipient's username" onChange={(event) => setUsername(event.target.value)} />
						<label className="grey-text">
							Designation
        		</label>
						<select value={designation} className="form-control" onChange={(event) => setDesignation(event.target.value)}>
							<option value="">Select Designation</option>
							<option value=".cf">Co-Founder</option>
							<option value=".dtr">Director</option>
							<option value=".adtr">Associate Director</option>
							<option value=".dm">District Manager</option>
							<option value=".adm">Associate District Manager</option>
							<option value=".am">Area Manager</option>
							<option value=".asm">Associate Manager</option>
							<option value=".sr">Seller / Product Introducer</option>
						</select>
						<div className="mt-4">
							<MDBBtn color="indigo" onClick={() => props.addedEmail(username + designation + '@slbi.lk')}>Add Email</MDBBtn>
						</div>
					</form>
				</div>
			</MDBCol>
		</MDBCol>
	);

}

export default CreateCSV;