import React, { useState } from "react";
import {
	MDBAlert
} from 'mdbreact';

const AlertPage = props => {

	let alertElement = null;

	const [visible, setVisible] = useState(true);

	const onDismiss = () => setVisible(false);

	switch (props.alertType) {
		case ('primary'):
			alertElement = (
				<MDBAlert color="primary" isOpen={visible} toggle={onDismiss}>
					{props.text}
				</MDBAlert>
			);
			break;
		case ('secondary'):
			alertElement = (
				<MDBAlert color="secondary" isOpen={visible} toggle={onDismiss}>
					{props.text}
				</MDBAlert>
			);
			break;
		case ('success'):
			alertElement = (
				<MDBAlert color="success" isOpen={visible} toggle={onDismiss}>
					{props.text}
				</MDBAlert>
			);
			break;
		case ('danger'):
			alertElement = (
				<MDBAlert color="danger" isOpen={visible} toggle={onDismiss}>
					{props.text}
				</MDBAlert>
			);
			break;
		case ('warning'):
			alertElement = (
				<MDBAlert color="warning" isOpen={visible} toggle={onDismiss}>
					{props.text}
				</MDBAlert>
			);
			break;
		case ('info'):
			alertElement = (
				<MDBAlert color="info" isOpen={visible} toggle={onDismiss}>
					{props.text}
				</MDBAlert>
			);
			break;
		case ('light'):
			alertElement = (
				<MDBAlert color="light" isOpen={visible} toggle={onDismiss}>
					{props.text}
				</MDBAlert>
			);
			break;
		case ('dark'):
			alertElement = (
				<MDBAlert color="dark" isOpen={visible} toggle={onDismiss}>
					{props.text}
				</MDBAlert>
			);
			break;
		default:
			alertElement = (
				<MDBAlert color="primary" isOpen={visible} toggle={onDismiss}>
					{props.text}
				</MDBAlert>
			);
	}

	return (
		alertElement
	);
};

export default AlertPage;