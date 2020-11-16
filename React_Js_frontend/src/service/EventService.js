import Axios from "axios";
import { server } from "./Constants.js";

export async function getAllEvents() {
	return Axios({
		method: "GET",
		url: `${server}event`,
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

export async function getSingleEvent(eventId) {
	return Axios({
		method: "POST",
		url: `${server}event/singleEvent`,
		data: JSON.stringify({
			id: eventId,
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

export async function postEvent(eventData) {
	console.log(eventData);

	return Axios({
		method: "POST",
		url: `${server}event`,
		data: JSON.stringify({
			name: eventData.name,
			locationName: eventData.locationName,
			category: eventData.category,
			description: eventData.description,
			date: eventData.date,
			time: eventData.time,
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

export async function joinEvent(eventId) {
	return Axios({
		method: "POST",
		url: `${server}event/joinEvent`,
		data: JSON.stringify({
			id: eventId,
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

export async function leaveEvent(eventId) {
	return Axios({
		method: "POST",
		url: `${server}event/leaveEvent`,
		data: JSON.stringify({
			id: eventId,
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

export async function deleteEvent(eventId) {
	return Axios({
		method: "POST",
		url: `${server}event/delete`,
		data: eventId,
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
