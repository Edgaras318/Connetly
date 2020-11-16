import React, { Component } from "react";
import Textbox from "./Textbox";
import Button from "./Button";
import { postLocation } from "../service/LocationService";
import { Link } from "react-router-dom";
import UserImage from "../assets/avatar.png";

export default class CreateLocation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
		};
	}

	handleChange = (event, id) => {
		this.setState({ [id]: event });
	};

	onSubmit = () => {
		console.log("hallo");
		postLocation(this.state.name).then((value) => {
			console.log(value);
			if (value.status === 200) {
				console.log("location posted");
			} else {
				console.log("something went wrong");
			}
		});
	};

	render() {
		return (
			<div>
				<div className="content-holder">
				<img src={UserImage} alt="userImage"></img>
					<span className="account-title">Post a location</span>
					<Textbox
						id="name"
						name="Location name"
						callback={(e, id) => this.handleChange(e, id)}
					></Textbox>
					<Button buttonName="Submit" callback={this.onSubmit}></Button>

					<div>
						<Link to="/locationoverview">Show all locations</Link>
					</div>
				</div>
			</div>
		);
	}
}
