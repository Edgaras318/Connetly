import React, { Component } from "react";
import Textbox from "./Textbox";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Datepicker from "./Datepicker";
import { postEvent } from "../service/EventService";
import { getAllLocations } from "../service/LocationService";
import { getAllCategories } from "../service/CategoryService";

export default class EventCreation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			locations: [],
			categories: [],
			locationId: "",
			category: "",
			date: "",
			time: "",
			locationName: "",
		};

		this.popup = React.createRef();
		this.datepicker = React.createRef();
		this.datetextbox = React.createRef();
	}

	componentDidMount() {
		getAllLocations().then((value) => {
			if (value.status === 200) {
				this.setState({
					locations: value.data,
				});
			}
		});

		getAllCategories().then((value) => {
			if (value.status === 200) {
				this.setState({
					categories: value.data,
				});
			}
		});
	}

	createEvent() {
		let eventData = {
			name: this.state.name,
			locationName: this.state.locationName,
			category: this.state.category,
			description: this.state.description,
			date: this.state.date,
			time: this.state.time,
		};
		postEvent(eventData).then((value) => {
			if (value.status === 200) {
				this.props.history.push({
					pathname: "/joinevent",
					state: { id: value.data.id },
				});
			}
		});
	}
	ConfirmDate = (date) => {
		this.date = date;
		this.datetextbox.current.textbox.current.value = this.date;
		this.datetextbox.current.textbox.current.onchange();
		this.CloseDatepicker();
	};

	OpenDatePicker = () => {
		this.popup.current.style.display = "flex";
		this.popup.current.classList.remove("fade-out");
		this.datepicker.current.datepicker.current.classList.remove("pop-back");
		this.popup.current.classList.toggle("fade-animation");
		this.datepicker.current.datepicker.current.classList.toggle(
			"popup-animation"
		);
	};

	CloseDatepicker = () => {
		this.popup.current.classList.remove("fade-animation");
		this.datepicker.current.datepicker.current.classList.remove(
			"popup-animation"
		);
		this.popup.current.classList.add("fade-out");
		this.datepicker.current.datepicker.current.classList.add("pop-back");
		setTimeout(() => {
			this.popup.current.style.display = "none";
		}, 500);
	};

	SetCategory = (item) => {
		this.setState({
			category: item,
		});
	};

	handleChange = (value, id) => {
		this.setState({
			[id]: value,
		});
	};

	redirectToDashboard() {
		this.props.history.push("/dashboard");
	}

	render() {
		return (
			<div className="content-holder">
				<span className="page-title">Create your event</span>
				<Dropdown
					id="category"
					itemslist={this.state.categories}
					callback={this.SetCategory}
					placeholder="Category"
				></Dropdown>
				<Textbox
					name="Event name"
					id="name"
					callback={(e, id) => this.handleChange(e, id)}
				></Textbox>
				<Textbox
					id="locationName"
					name="Event location"
					callback={(value, id) => this.handleChange(value, id)}
				></Textbox>
				<textarea
					id="description"
					onChange={(e) => this.handleChange(e.target.value, e.target.id)}
					className="textfield"
					placeholder="Description"
				></textarea>
				<div className="flex-container">
					<Textbox
						ref={this.datetextbox}
						width={110}
						callback={(value, id) => this.handleChange(value, id)}
						labelanimation={false}
						click={this.OpenDatePicker}
						id="date"
						name="Date"
					></Textbox>
					<Textbox
						width={110}
						callback={(value, id) => this.handleChange(value, id)}
						labelanimation={false}
						id="time"
						name="Time"
					></Textbox>
				</div>
				<div className="buttons-holder">
					<Button
						buttonName="Create"
						callback={() => this.createEvent()}
					></Button>
					<Button
						buttonName="Cancel"
						className="outlined"
						callback={() => this.redirectToDashboard()}
					></Button>
				</div>
				<div ref={this.popup} className="popup-holder">
					<Datepicker
						confirm={this.ConfirmDate}
						close={this.CloseDatepicker}
						ref={this.datepicker}
					></Datepicker>
				</div>
			</div>
		);
	}
}
