import Axios from "axios";
import { server } from "./Constants.js";

export async function getAllCategories() {
	return Axios({
		method: "GET",
		url: `${server}category`,
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
