import React, { Component } from "react";

export default class Textbox extends Component {
	constructor() {
		super();
		this.textbox = React.createRef();
	}

	componentDidMount = ()=>{
		this.textbox.current.onchange = ()=>{
			this.CheckIfEmpty();
		}
	}

	CheckIfEmpty = () => {
		if (this.textbox.current.value !== "") {
			this.textbox.current.parentNode
				.querySelector(".textbox-name")
				.classList.add("translated-label");
		} else {
			this.textbox.current.parentNode
				.querySelector(".textbox-name")
				.classList.remove("translated-label");
		}

		if (this.props.callback != null) {
			this.props.callback(this.textbox.current.value, this.props.id);
		}
	};

	render() {
		let input;
		let style;
		if (this.props.width != null) {
			style = { width: this.props.width, marginRight: 40 + "px" };
		}


		if (this.props.id === "password" || this.props.id === "cpassword") {
			input = (
				<input
					style={style}
					type="password"
					className="textbox"
					ref={this.textbox}
					onClick={()=>{if(this.props.click != null){this.props.click()}}}
				></input>
			);
		} else {
			input = (
				<input
					type="text"
					style={style}
					className="textbox"
					ref={this.textbox}
					onClick={()=>{if(this.props.click != null){this.props.click()}}}
				></input>
			);
		}

		return (
			<div className="textbox-holder">
				{input}
				<label className="textbox-name">{this.props.name}</label>
			</div>
		);
	}
}
