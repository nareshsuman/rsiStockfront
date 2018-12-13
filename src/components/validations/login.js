// import Validation from '../common/function';

export default function validateInput(data) {
	let errors = {};
	let isValid = true;

	
	if (data.username === '') {
		errors.username = 'This field is required';
		isValid = false;
	}


	if (data.password === '') {
		errors.password = 'This field is required';
		isValid = false;
	}

	return {
		errors,
		isValid,
	};
}
