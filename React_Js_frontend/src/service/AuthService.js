import Axios from "axios";
import { server } from "./Constants.js";

export async function login(username, password) {
	return Axios({
		method: "POST",
		url: `${server}auth/login`,
		data: JSON.stringify({
			email: username,
			password: password,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => {
			window.sessionStorage.setItem("token", res.data.token);
			window.sessionStorage.setItem("role", res.data.user.role);
			window.sessionStorage.setItem("firstName", res.data.user.firstName);
			window.sessionStorage.setItem("lastName", res.data.user.lastName);
			window.sessionStorage.setItem("email", res.data.user.username);

			return res;
		})
		.catch((error) => {
			console.log(error);
			return error.response;
		});
}

export async function register(credentials) {
	console.log(credentials);

	let data = JSON.stringify({
		email: credentials.email,
		password: credentials.password,
		firstName: credentials.firstname,
		lastName: credentials.lastname,
		nationality: credentials.nationality,
		houseNumber: credentials.houseNumber,
		postalCode: credentials.postalCode,
		city: credentials.city,
	});

	console.log(data);
	return Axios({
		method: "POST",
		url: `${server}auth/register`,
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => {
			return res;
		})
		.catch((error) => {
			console.log(error);
			return error.response;
		});
}

export default function isLoggedIn() {
	if (window.sessionStorage.getItem("token") === null) {
		return false;
	}
	return true;
}
