import React, { useMemo } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';

import './EmailPreview.css'

const EmailPreview = (props) => {

	return useMemo(() => (
		<MDBCol lg="6" md="6" >
			<MDBCard className="EmailCard">
				<MDBCardBody>
					<div className="titleContainer">
						<MDBCardTitle>Preview Email Addresses</MDBCardTitle>
						<div onClick={props.onArrClear}>
							<i className="fas fa-times fa-2x" style={{ color: 'red', cursor: 'pointer' }}></i>
						</div>
					</div>
					<MDBTable responsive>
						<MDBTableHead className="grey lighten-2">
							<tr>
								<th scope="col">Email Address</th>
								<th scope="col"></th>
								<th scope="col">Password</th>
								<th></th>
							</tr>
						</MDBTableHead>
						<MDBTableBody>
							{props.email.map((emailAddress, index) => {
								return (
									<tr key={index}>
										<td>{emailAddress.email}</td>
										<td>-</td>
										<td>{emailAddress.password}</td>
										<td>
											<div onClick={props.deleteEmail.bind(this, index)}>
												<i className="fas fa-trash-alt" style={{ color: 'red', cursor: 'pointer' }}></i>
											</div>
										</td>
									</tr>
								)
							})}
						</MDBTableBody>
					</MDBTable>
				</MDBCardBody>
			</MDBCard>
		</MDBCol >
	), [props]);
};

export default EmailPreview;
