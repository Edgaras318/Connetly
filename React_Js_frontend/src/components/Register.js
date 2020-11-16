import React, { Component } from "react";
import { register } from "./../service/AuthService";
import Textbox from "./Textbox";
import Button from "./Button";
import "../register.css";
import UserImage from "../assets/avatar.png";
import { Link } from "react-router-dom";

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: "",
			lastname: "",
			email: "",
			nationality: "",
			houseNumber: "",
			postalCode: "",
			city: "",
			password: "",
			cpassword: "",
			showMessage: false,
			message: "",
		};
	}

	register = () => {
		if (this.checkPasswordMatch()) {
			register(this.state).then((value) => {
				if (value.status === 200) {
					if (window.confirm("account succesfully created")) {
						this.props.history.push("/dashboard");
					}
				} else {
					this.setState({
						showMessage: true,
						message: "Please fill in the form",
					});
				}
			});
		}
	};

	handleChange = (event, id) => {
		this.setState({ [id]: event });
	};

	checkPasswordMatch() {
		if (this.state.cpassword === this.state.password) {
			return true;
		}
		this.setState({
			showMessage: true,
			message: "Passwords do not match",
		});
	}

	render() {
		return (
			<div className="content-holder">
				<img className="logo" src={UserImage} alt="userImage"></img>
				<span className="account-title">Create an account</span>
				<Textbox
					id="firstname"
					name="First Name"
					callback={(e, id) => this.handleChange(e, id)}
				></Textbox>
				<Textbox
					id="lastname"
					name="Last Name"
					callback={(e, id) => this.handleChange(e, id)}
				></Textbox>
				<Textbox
					id="email"
					name="Email Address"
					callback={(e, id) => this.handleChange(e, id)}
				></Textbox>
				<Textbox
					id="nationality"
					name="Nationality"
					callback={(e, id) => this.handleChange(e, id)}
				></Textbox>
				<div className="flex-container">
					<Textbox
						width={110}
						id="houseNumber"
						name="House Number"
						callback={(e, id) => this.handleChange(e, id)}
					></Textbox>
					<Textbox
						width={110}
						id="postalCode"
						name="Postal Code"
						callback={(e, id) => this.handleChange(e, id)}
					></Textbox>
				</div>
				<Textbox
					id="city"
					name="City"
					callback={(e, id) => this.handleChange(e, id)}
				></Textbox>
				<Textbox
					id="password"
					name="Password"
					callback={(e, id) => this.handleChange(e, id)}
				></Textbox>
				<Textbox
					id="cpassword"
					name="Confirm Password"
					callback={(e, id) => this.handleChange(e, id)}
				></Textbox>
				{this.state.showMessage && <div> {this.state.message} </div>}

				<div className="terms-conditions-box">
					<div className="checkbox-holder">
						<input className="terms-conditions-checkbox" type="checkbox"></input>
						<label for="check" className="checkmark"></label>
					</div>
				
					<p class="agree-text register-p">I agree to the{" "}
						<Link class="text" to="">
							Terms and Conditions
						</Link>
					</p>
				</div>
				<Button
					buttonName="Sign Up"
					id="submit"
					callback={() => this.register()}
				></Button>

				<p className="register-p login-text">
					Already have an account?{" "}
					<Link class="text" to="/login">
						Login
					</Link>
				</p>
			</div>
		);
	}
}
