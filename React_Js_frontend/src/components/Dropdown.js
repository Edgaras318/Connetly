import React, { Component } from "react";

export default class Dropdown extends Component {
	constructor() {
		super();
		this.animationtime = 1000;
		this.dropdown = React.createRef();
		this.dropdownArrow = React.createRef();
		this.contentbox = React.createRef();
		this.dropdowntitle = React.createRef();
	}

	OpenDropdown = (height) => {
		if (this.dropdown.current.classList.contains("dropdown-open")) {
			this.dropdown.current.classList.remove("dropdown-open");
			this.dropdownArrow.current.classList.remove("dropdown-opened-arrow");
			this.contentbox.current.style.height = "0px";
		} else {
			this.dropdown.current.classList.add("dropdown-open");
			this.dropdownArrow.current.classList.add("dropdown-opened-arrow");
			this.contentbox.current.style.height =
			this.openheight * height + 4 + "px";
		}
	};

	render() {
		let classes = 'dropdown';
		let items = [];
		let expectionitem = <button className="dropdown-option-button">Empty</button>;

		let itemheight = parseFloat(
			getComputedStyle(document.body).getPropertyValue("--dropdownheight")
		);

        if(this.props.classes != null){
            this.props.classes.forEach(classtring => {
                classes += ' ' + classtring;
            });
		}

		if(this.props.itemslist != null){
			if(this.props.itemslist.length != 0){
				this.openheight = this.props.itemslist.length;
	
				this.props.itemslist.forEach(item => {
					let element = <button key={item.id} className="dropdown-option-button" id={item.id} onClick={(e) => {
						this.dropdowntitle.current.innerHTML = item.name;
						this.props.callback(e.target.id);
					}}>{item.name}</button>
	
					items.push(element);
				});
			}
			else{
				this.openheight = 1;
				items = expectionitem;
			}

		}
		else{
			this.openheight = 1;
			items = expectionitem;
		}

		return (
			<div
				className={classes}
				ref={this.dropdown}
				onClick={() => {
					this.OpenDropdown(itemheight);
				}}
			>
				<div className="dropdown-top-box">
					<span ref={this.dropdowntitle} className="dropdown-title">
						{this.props.placeholder}
					</span>
					<svg
						ref={this.dropdownArrow}
						xmlns="http://www.w3.org/2000/svg"
						className="dropdown-arrow"
						width="11.774"
						height="11.774"
						viewBox="0 0 11.774 11.774"
					>
						<path
							id="arrow"
							d="M0,7.564H7.588V0"
							transform="translate(5.879) rotate(45)"
							fill="none"
							strokeWidth="1.5"
						/>
					</svg>
				</div>
				<div ref={this.contentbox} className="dropdown-content-box">
					{items}	
				</div>
			</div>
		);
	}
}
