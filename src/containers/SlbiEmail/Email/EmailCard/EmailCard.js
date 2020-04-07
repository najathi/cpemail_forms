import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBIcon, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import { CSVLink } from "react-csv";

import './EmailCard.css';


const CardExample = props => {

	const emails = props.email.filter((item, index) => props.email.indexOf(item) === index);

	console.log(emails[0]);

	return (
		<MDBCol lg="6" md="6" style={{ marginTop: "1rem" }} >
			<MDBCard className="EmailCard">
				<MDBCardBody>
					<MDBCardTitle>Adding Email Addresses</MDBCardTitle>
					<MDBTable responsive>
						<MDBTableHead className="grey lighten-2">
							<tr>
								<th scope="col">#</th>
								<th scope="col">Email Address</th>
								<th scope="col">Password</th>
								<th></th>
							</tr>
						</MDBTableHead>
						<MDBTableBody>
							{emails.map((emailAddress, index) => {
								return (
									<tr key={index}>
										<th scope="row">{index + 1}</th>
										<td>{emailAddress.Email}</td>
										<td>{emailAddress.Password}</td>
										<td><div onClick={props.deleteEmail.bind(this, index)}><i className="fas fa-trash-alt" style={{ color: 'red', cursor: 'pointer' }}></i></div></td>
									</tr>
								)
							})}
						</MDBTableBody>
					</MDBTable>
					<CSVLink data={props.email} filename="SLBI-Email.xls"><MDBBtn color="dark"><MDBIcon icon="download" /> Download</MDBBtn></CSVLink>
				</MDBCardBody>
			</MDBCard>
		</MDBCol >
	)
}

export default CardExample;