import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBIcon, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import { CSVLink } from "react-csv";
import ReactExport from "react-export-excel";

import './EmailCard.css';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
					<div className="downloadContainer">
						<CSVLink data={props.email} filename="SLBI-Email.csv">
							<MDBIcon icon="file-csv" size="2x" className="red-text" />
						</CSVLink>
						<ExcelFile element={
							<MDBIcon icon="file-excel" size="2x" className="green-text" />
						} filename="SLBI-Email">
							<ExcelSheet data={props.email} name="Employees">
								<ExcelColumn label="Email" value="Email" />
								<ExcelColumn label="Password" value="Password" />
								<ExcelColumn label="Quota" value="Quota" />
							</ExcelSheet>
						</ExcelFile>
					</div>
				</MDBCardBody>
			</MDBCard>
		</MDBCol >
	)
}

export default CardExample;