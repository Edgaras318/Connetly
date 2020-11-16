import React, { Component } from "react";
import Button from "./Button";
import "../joinevent.css";
import { getSingleEvent, joinEvent, leaveEvent } from "../service/EventService";

import Global from "../assets/global.svg";
import Usergroup from "../assets/users-group.svg";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";

export default class JoinEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			event: "",
			location: "",
			youAreGoing: false,
			isCountrySelected: false,
		};

		this.nationalities = [
			{
				id: 0,
				name: "Dutch",
				tip1: "They like drop.",
				tip2:
					"Their country is flat, so don't go hiking in hilly areas with them.",
			},
			{
				id: 1,
				name: "Spanish",
				tip1: "Like paella.",
				tip2: "Usually talk very loud, so don't forget your hearing protection",
			},
			{
				id: 2,
				name: "Lithuanian",
				tip1: "Work out during afternoon break",
				tip2: "Very muscular.",
			},
			{
				id: 3,
				name: "Norse",
				tip1: "Probably a viking.",
				tip2: "Might have a hammer that you cannot lift.",
			},
			{
				id: 4,
				name: "French",
				tip1: "Baguette.",
				tip2: "Fromage.",
			},
		];
	}

	componentDidMount() {
		this.loadEvent();
	}

	loadEvent() {
		getSingleEvent(this.props.location.state.id).then((value) => {
			if (value.status === 200) {
				this.setState({
					event: value.data,
					location: value.data.location,
					amountOfMembers: value.data.members.length,
				});
				this.checkIfUserIsMember();
			} else {
				console.log("getting event went wrong");
			}
		});
	}

	checkIfUserIsMember() {
		this.state.event.members.forEach((element) => {
			if (
				element.firstName === sessionStorage.getItem("firstName") &&
				element.lastName === sessionStorage.getItem("lastName")
			) {
				this.setState({
					youAreGoing: true,
				});
			}
		});
	}

	clickEventJoin() {
		joinEvent(this.props.location.state.id).then((value) => {
			if (value.status === 200) {
				alert("successfully joined event");
				this.loadEvent();
			}
		});
	}

	clickLeaveEvent() {
		leaveEvent(this.props.location.state.id)
			.then((value) => {
				if (value.status === 200) {
					this.setState({
						youAreGoing: false,
					});
					this.loadEvent();
				}
			})
			.catch((value) => {
				console.log(value);
			});
	}

	showTip(item) {
		console.log(item);

		this.setState({
			isCountrySelected: true,
			countrySelected: this.nationalities[item],
		});
	}

	redirectToDashboard = () => {
		this.props.history.push("dashboard");
	};

	render() {
		let buttonPart;
		let tips;

		if (this.state.youAreGoing) {
			tips = (
				<div>
					<h3>
						{" "}
						In order to break the cultural barrier you can choose a nationality
						and it will show tips{" "}
					</h3>
					<Dropdown
						placeholder="Choose a nationality"
						itemslist={this.nationalities}
						callback={(e) => this.showTip(e)}
					></Dropdown>

					{this.state.isCountrySelected && (
						<div>
							<h2> Tip 1:</h2>
							<div>{this.state.countrySelected.tip1}</div>
							<h2> Tip 2:</h2>
							<div>{this.state.countrySelected.tip2}</div>
						</div>
					)}
				</div>
			);
		}

		if (!this.state.youAreGoing) {
			buttonPart = (
				<div className="buttons-holder">
					<Button
						buttonName="Going"
						className="submit"
						callback={() => this.clickEventJoin()}
					></Button>
					<Button
						buttonName="Not interested"
						className="outlined"
						callback={() => this.redirectToDashboard()}
					></Button>
				</div>
			);
		} else {
			buttonPart = (
				<div className="buttons-holder">
					<Button
						buttonName="Leave"
						className="submit"
						callback={() => this.clickLeaveEvent()}
					></Button>
										<Button
						buttonName="Go back"
						className="outlined"
						callback={() => this.redirectToDashboard()}
					></Button>
				</div>
			);
		}

		return (
			<div className="fullscreen">
				<div className="event-image"></div>
				<div className="joineventwrapper">
					<span className="event-title">{this.state.event.name}</span>
					<span className="orange-text event-page-text">
						{this.state.event.date} {this.state.event.time}
					</span>
					<p className="event-bigmargin-text">
						<span className="event-strong-text strong">Location:</span>
						<p className="event-bigmargin-text">{this.state.location.name}</p>
					</p>
					<p className="event-page-text">
						<span className="event-strong-text">Description:</span>
					</p>
					<p className="event-bigmargin-text">{this.state.event.description}</p>

					<div className="event-information-box">
						<div className="event-information-flex">
							<img className="event-icon" src={Global} alt="global"></img>
							<span className="event-information-text">
								12
								<span className="event-strong-text strong-margin">
									Nationalities
								</span>
							</span>
						</div>
						<div className="event-information-flex">
							<img
								className="event-icon"
								src={Usergroup}
								alt="user group"
							></img>
							<span className="event-information-text">
								{this.state.amountOfMembers}
								<span className="event-strong-text strong-margin">Going</span>
							</span>
						</div>
					</div>
					{tips}
					{buttonPart}
				</div>
			</div>
		);
	}
}
