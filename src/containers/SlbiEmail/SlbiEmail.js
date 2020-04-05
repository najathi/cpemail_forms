import React, { Component } from "react";
import {
	MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBCol
} from "mdbreact";
import { Route, Switch } from 'react-router-dom';

import './SlbiEmail.css'
import Email from './Email/Email';
import CreateEmail from './Email/CreateEmail/CreateEmail';

class NavbarPage extends Component {
	state = {
		isOpen: false
	};

	toggleCollapse = () => {
		this.setState({ isOpen: !this.state.isOpen });
	}

	render() {
		return (
			<MDBCol>
				<MDBNavbar color="default-color" dark expand="md">
					<MDBNavbarBrand>
						<strong className="white-text">SLBI Email</strong>
					</MDBNavbarBrand>
					<MDBNavbarToggler onClick={this.toggleCollapse} />
					<MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
						<MDBNavbarNav right>
							<MDBNavItem active>
								<MDBNavLink to="/" >Home</MDBNavLink>
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

				<Switch>
					<Route path="/bulk-email/" component={Email} />
					<Route path="/create-email/" component={CreateEmail} />
					<Route path="/" component={Email} exact />
					<Route render={() => <div className="NotFoundPage"><h1>Not Found</h1></div>} />
				</Switch>
			</MDBCol>
		);
	}
}

export default NavbarPage;