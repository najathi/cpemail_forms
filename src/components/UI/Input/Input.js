import React from 'react';

import classes from './Input.module.css';

const Input = props => {

	let inputElement = null;

	const inputClasses = ['form-control'];

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
	}

	switch (props.elementType) {
		case ('input'):
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					name={props.name}
					value={props.value}
					onChange={props.changed} />
			);
			break;
		case ('input-group'):
			inputElement = (
				<React.Fragment >
					<div className="input-group">
						<input
							className={inputClasses.join(' ')}
							{...props.elementConfig}
							name={props.name}
							value={props.value}
							onChange={props.changed} />
						<div className="input-group-append">
							<span className="input-group-text" id="basic-addon2">@slbi.lk</span>
						</div>
					</div>
					{
						props.formErrors.email.length > 0 && (
							<span className={classes.errorMessage}>{props.formErrors.email}</span>
						)
					}
				</React.Fragment>
			);
			break;
		case ('textarea'):
			inputElement = (<textarea
				className={inputClasses.join(' ')}
				{...props.elementConfig}
				name={props.name}
				value={props.value}
				onChange={props.changed} />);
			break;
		case ('select'):
			inputElement = (
				<select
					className={inputClasses.join(' ')}
					name={props.name}
					onChange={props.changed}>
					{props.elementConfig.options.map(option => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			);
			break;
		default:
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					name={props.name}
					value={props.value}
					onChange={props.changed} />
			);
	}

	return (
		<div className={classes.mt_1}>
			<label>{props.label}</label>
			{inputElement}
		</div >
	);
}

export default Input;