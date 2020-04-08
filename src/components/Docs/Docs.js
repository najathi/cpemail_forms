import React from "react";
import { MDBCard, MDBNavLink } from "mdbreact";

const Docs = (props) => {

	return (
		<MDBCard
			className="my-5 px-5 mx-auto"
			style={{ fontWeight: 300, maxWidth: "90%" }}
		>
			<div className="doc-wrapper" style={{ marginTop: '3rem' }}>
				<div className="container">
					<div id="doc-header" className="doc-header text-center">
						<h1 className="doc-title"><i className="icon fa fa-paper-plane"></i> SLBI Email Documentation</h1>
					</div>
					<div className="doc-body row" style={{ marginTop: '3rem', marginBottom: '5rem' }}>
						<div className="doc-content col-md-12 col-12 order-1">
							<div className="content-inner">
								<section id="download-section" className="doc-section">
									<h2 className="section-title">How to use and create an email / bulk accounts ?</h2>
									<div className="section-block">
										<p>This system has two features. such as,</p>
										<ul>
											<li><MDBNavLink to="/create-email/">Create an Email Account</MDBNavLink></li>
											<li><MDBNavLink to="/bulk-email/">Create Bulk Email Accounts</MDBNavLink></li>
										</ul>
									</div>
								</section>
								<section id="download-section" className="doc-section">
									<h4 className="section-title">Create an Email Account</h4>
									<div className="section-block">
										<p>This feature, you can add an email account one by one</p>
									</div>
								</section>
								<section id="download-section" className="doc-section">
									<h4 className="section-title">Create an Email Account</h4>
									<div className="section-block">
										<p>This feature, you can add bulk email accounts. when you add email account that will create a <b>csv</b> file. After Please send the file on whatsapp to Mr. Nahaar. Nahaar will create email accounts for you.</p>
									</div>
								</section>
							</div>
						</div>
					</div>
				</div>
			</div>

		</MDBCard>
	);
}

export default Docs;