export default {
	getlength(number) {
		console.log(number);
		return number.toString().length;
	},
	validphone(phone) {
		var re = /^\$?[0-9]+(\[0-9]*)?$/;
		return re.test(phone);
	},
	validPassword(password) {
		console.log('h');
		var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})$/;
		return re.test(password);
	},
	PasswordValidation(password) {
		console.log('h',password);
		var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
		return strongRegex.test(password);
	},
	validateemail(email) {
		/* eslint-disable */
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		/* eslint-disable */
		return re.test(email);
	},
};
