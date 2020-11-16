import React, { Component } from "react";
import { login } from "./../service/AuthService";
import Textbox from "./Textbox";
import Button from "./Button";
import "../login.css";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			message: "",
			showMessage: false,
		};
	}

	handleChange = (value, id) => {
		this.setState({
			[id]: value,
		});
	};

	handleSubmit = (e) => {
		login(this.state.email, this.state.password).then((value) => {
			if (value.status === 200) {
				this.props.history.push("/dashboard");
			} else {
				this.setState({
					showMessage: true,
					message: "Credentials incorrect",
				});
			}
		});
	};

	render() {
		return (
			<div className="content-holder">
				<img className="logo" src={Logo} alt="logo"></img>
				<span className="login-title">Hello, Welcome</span>
				<Textbox
					id="email"
					name="Email Address"
					callback={(e, id) => this.handleChange(e, id)}
				></Textbox>
				<Textbox
					id="password"
					name="Password"
					callback={(e, id) => this.handleChange(e, id)}
				></Textbox>
				{this.state.showMessage && <div> {this.state.message} </div>}
				<Link className="forgot-text" to="">
					Forgot your password
				</Link>
				<Button
					buttonName="Login"
					id="submit"
					callback={() => this.handleSubmit()}
				></Button>

				<div className="separator">OR</div>

				<p className="login-p">
					Don't have an account?{" "}
					<Link className="text" to="/register">
						Sign Up
					</Link>
				</p>
			</div>
		);
	}
}
