import React, { Component } from "react";

export default class Button extends Component {
	constructor() {
		super();
		this.animationtime = 1000;
		this.button = React.createRef();
	}

	Callback = (event) => {
		if (!this.button.current.classList.contains("outlined")) {
			let bubble = document.createElement("div");
			bubble.style.left = event.pageX - this.button.current.offsetLeft + "px";
			bubble.style.top = event.pageY - this.button.current.offsetTop + "px";
			bubble.classList.add("animationbubble");
			this.button.current.appendChild(bubble);
			// setTimeout(
			// 	() => {
			// 		this.button.current.removeChild(bubble);
			// 	},
			// 	this.animationtime,
			// );
		}
		this.props.callback();
	};

	render() {
		let classes = "button";
		if (this.props.className != null) {
			classes += " " + this.props.className;
		}

		return (
			<button
				className={classes}
				ref={this.button}
				onClick={(e) => this.Callback(e)}
			>
				<span className="button-text">{this.props.buttonName}</span>
			</button>
		);
	}
}
