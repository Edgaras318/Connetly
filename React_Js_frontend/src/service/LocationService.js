import Axios from "axios";
import { server } from "./Constants.js";

export async function getAllLocations() {
	return Axios({
		method: "GET",
		url: `${server}location`,
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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

export async function postLocation(locationName) {
	return Axios({
		method: "POST",
		url: `${server}location`,
		data: JSON.stringify({
			name: locationName,
		}),
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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

export async function deleteLocation(locId) {
	return Axios({
		method: "POST",
		url: `${server}location/${locId}`,
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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

export async function toggleEnableDisableLocation(locId) {
	return Axios({
		method: "PUT",
		url: `${server}location`,
		data: JSON.stringify({
			id: locId,
		}),
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
