import Validation from '../common/function';

export default function validateInput(data) {
	let errors = {};
	let isValid = true;

	if (data.f_name === '') {
		errors.f_name = 'This field is required';
		isValid = false;
	}
	if (data.l_name === '') {
		errors.l_name = 'This field is required';
		isValid = false;
	}
	if (data.username === '') {
		errors.username = 'This field is required';
		isValid = false;
	}
	if (data.email === '') {
		errors.email = 'This field is required';
		isValid = false;
	} else if (Validation.validateemail(data.email) === false) {
		console.log(Validation.validateemail(data.email));
		errors.email = 'This email is not valid';
		isValid = false;
	}
	// if (Validation.validPassword(data.password) === false) {
	// 	console.log('pswd', Validation.validPassword(data.password) )
	// }
	console.log('pswd', data.password, Validation.PasswordValidation(data.password));
	if (data.password === '') {
		errors.password = 'This field is required';
		isValid = false;
	} else if(!Validation.PasswordValidation(data.password)){
		errors.password = 'Password must contain at least 1 lowercase,uppercase alphabetical, numeric, one special character,eight characters or longer';
		isValid = false;
	} 
	if (data.confirm_password !== data.password || data.confirm_password === '') {
		errors.confirm_password = 'Confirm password does not match';
		isValid = false;
	}

	if (data.gender === '' || data.gender === null) {
		errors.gender = 'This field is required';
		isValid = false;
	}
	if (data.mobile === '') {
		errors.mobile = 'This field is required';
		isValid = false;
	} else if (Validation.getlength(data.mobile) < 10 || Validation.getlength(data.mobile) > 15) {
		errors.mobile = 'Please enter a valid mobile number';
		isValid = false;
	}
	if (data.country === '') {
		errors.country = 'This field is required';
		isValid = false;
	}
	if (data.state === '') {
		errors.state = 'This field is required';
		isValid = false;
	}
	if (data.town === '') {
		errors.town = 'This field is required';
		isValid = false;
	}
	if (data.postcode === '') {
		errors.postcode = 'This field is required';
		isValid = false;
	}
	if (data.isVerified === 0) {
		errors.isVerified = 'This field is required';
		isValid = false;
	}
	if (data.checkBox === false) {
		errors.checkBox = 'This field is required';
		isValid = false;
	}

	return {
		errors,
		isValid,
	};
}
