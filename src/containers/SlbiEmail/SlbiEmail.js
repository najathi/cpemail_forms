import React, { Component } from "react";
import {
	MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
} from "mdbreact";

import './SlbiEmail.css';

class NavbarPage extends Component {
	state = {
		isOpen: false
	};

	toggleCollapse = () => {
		this.setState({ isOpen: !this.state.isOpen });
	}

	render() {
		return (
			<MDBNavbar color="default-color" dark expand="md">
				<MDBNavbarBrand>
					<strong className="white-text">
						<MDBNavLink to="/" style={{ listStyleType: 'none', textDecoration: 'none', color: 'white' }}>
							SLBI Email
							</MDBNavLink>
					</strong>
				</MDBNavbarBrand>
				<MDBNavbarToggler onClick={this.toggleCollapse} />
				<MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
					<MDBNavbarNav right>
						<MDBNavItem active>
							<MDBNavLink to="/">Home</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
							<MDBNavLink to="/create-email/">Create an Email</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
							<MDBNavLink to="/bulk-email/">Bulk Email</MDBNavLink>
						</MDBNavItem>
					</MDBNavbarNav>
				</MDBCollapse>
			</MDBNavbar>
		);
	}
}

export default NavbarPage;