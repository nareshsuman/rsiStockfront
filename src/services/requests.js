import axios from 'axios';

export default {
	// base = 'http://redix-backend.tidbitlab.com/api/',
	base_url() {
		return 'http://localhost:3001/';
	},
	storeToken(token, usrrl) {
		localStorage.setItem(
			'authToken',
			JSON.stringify({
				token,
				usrrl,
			})
		);
	},
	getToken() {
		const authToken = JSON.parse(localStorage.getItem('authToken'));
		const token = authToken ? authToken.token : null;
		return token;
	},
	destroyToken() {
		localStorage.removeItem('authToken');
	},
	AxiosPOST(url, body) {
		return axios.post(this.base_url() + url, body).then(response => response);
	},
	// GET TRUE
	GET(url) {
		const authToken = JSON.parse(localStorage.getItem('authToken'));
		const token = authToken ? authToken.token : null;
		return fetch(this.base_url() + url, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(res => res);
	},
	POST(url, body) {
		const authToken = JSON.parse(localStorage.getItem('authToken'));
		const token = authToken ? authToken.token : null;
		return fetch(this.base_url() + url, {
			method: 'POST',
			body: body,
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(res => res);
	},

	// POST TRUE
	POSTDATAAPI(url, body) {
		const authToken = JSON.parse(localStorage.getItem('authToken'));
		const token = authToken ? authToken.token : null;
		console.log(body, 'id');
		return fetch(this.base_url() + url, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(res => res);
	},
	POSTAPI(url) {
		const authToken = JSON.parse(localStorage.getItem('authToken'));
		const token = authToken ? authToken.token : null;
		return fetch(this.base_url() + url, {
			method: 'POST',
			body: {},
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(res => res);
	},

};
