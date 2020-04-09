import React from "react";
import { NavLink } from 'react-router-dom';
import { MDBCard, MDBNavLink, MDBIcon } from "mdbreact";

const Docs = (props) => {

	return (
		<MDBCard
			className="my-5 px-5 mx-auto"
			style={{ fontWeight: 300, maxWidth: "90%" }}
		>
			<div className="doc-wrapper" style={{ marginTop: '3rem' }}>
				<div className="container">
					<div id="doc-header" className="doc-header text-center">
						<h3 className="doc-title"><i className="icon fa fa-paper-plane"></i> SLBI Email Documentation</h3>
					</div>
					<div className="doc-body row" style={{ marginTop: '3rem', marginBottom: '5rem' }}>
						<div className="doc-content col-md-12 col-12 order-1">
							<div className="content-inner">
								<section id="download-section" className="doc-section">
									<h3 className="section-title">How to use and create an email / bulk accounts ?</h3>
									<div className="section-block">
										<p>This system has two features. such as,</p>
										<ul>
											<li><MDBNavLink to="/create-email/">Create an Email Account</MDBNavLink></li>
											<li><MDBNavLink to="/bulk-email/">Create Bulk Email Accounts</MDBNavLink></li>
										</ul>
									</div>
								</section>
								<section id="download-section" className="doc-section" style={{ marginTop: '2rem' }}>
									<h5 className="section-title">Create an Email Account
									<NavLink to="/create-email/">
											<MDBIcon style={{ marginLeft: '5px', cursor: 'pointer' }} icon="external-link-alt" />
										</NavLink></h5>
									<div className="section-block">
										<p>This feature, you can add an email account one by one</p>
									</div>
								</section>
								<section id="download-section" className="doc-section" style={{ marginTop: '2rem' }}>
									<h5 className="section-title">Create Bulk Email Accounts
									<NavLink to="/bulk-email/">
											<MDBIcon style={{ marginLeft: '5px', cursor: 'pointer' }} icon="external-link-alt" />
										</NavLink></h5>
									<div className="section-block">
										<p>This feature, you can add bulk email accounts. when you add email account that will create a <b>CSV</b> / <b>Excel</b> File. After Please send the file on whatsapp to Mr. Nahaar. Nahaar will create email accounts for you.</p>
									</div>
								</section>
							</div>
						</div>
					</div>
				</div>
			</div>

		</MDBCard >
	);
}

export default Docs;