import React, { Component } from "react";
import Navbar from "./Navbar";
import Dropdown from "./Dropdown";
import EventImage from "../eventimage.jpg";
import Evoluon from "../assets/evoluon.jpg";
import Party from "../assets/party.jpg";
import Workshop from "../assets/workshop.jpg";
import "../dashboard.css";
import { getAllEvents, deleteEvent } from "../service/EventService";
import UserImage from "../assets/avatar.png";
import Button from "./Button";
import { getAllCategories } from "../service/CategoryService";
import { Link } from "react-router-dom";
import eventicon from "../assets/eventicon.svg";

export default class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			events: [],
			categories: [],
			filteredEvents: [],
			category: "",
		};
		this.popupholder = React.createRef();
		this.popup= React.createRef();
	}

	componentDidMount() {
		getAllEvents().then((value) => {
			if (value.status === 200) {
				this.setState({
					events: value.data,
				});
			} else {
				console.log("something went wrong.");
			}
		});

		getAllCategories().then((value) => {
			this.state.categories.push({id: '10000', name: 'All'});
			if (value.status === 200) {
				value.data.forEach(data => {
					this.state.categories.push({id: data.id, name: data.name});
				});
			} else {
				console.log("something went wrong.");
			}
		});
	}

	redirectToEvent(eventId) {
		this.props.history.push({
			pathname: "/joinevent",
			state: { id: eventId },
		});
	}

	redirect(redirectLocation) {
		this.props.history.push(redirectLocation);
	}

	setCategory = (item) => {
		this.state.categories.forEach((element) => {
			if (element.id === item) {
				this.setState(
					{
						category: element.name,
					},
					function () {
						this.filterLunches();
					}
				);
			}
		});

	};

	filterLunches() {
		let filterEvents = [];
		this.state.events.forEach((element) => {
			if (element.category !== null) {
				if (element.category.name == this.state.category) {
					filterEvents.push(element);
				}
			}
		});

		this.setState({
			filteredEvents: filterEvents,
		});
	}

	deleteEvent = (eventId) => {
		let i = 0;
		this.state.events.forEach((element) => {
			if (element.id === eventId) {
				this.state.events.splice(i, 1);
			}
			i++;
		});
		console.log(this.state.events);
		this.forceUpdate();
	};

	CloseEventPopup = ()=>{
		this.popupholder.current.classList.remove("fade-animation");
		this.popupholder.current.classList.add("fade-out");
		this.popup.current.classList.remove('slide-from-bottom');
		this.popup.current.classList.add('slide-back-from-bottom');
		setTimeout(() => {
		  this.popupholder.current.style.display = "none";
		  this.popup.current.classList.remove('slide-back-from-bottom');
		}, 500);
	}
	
	OpenEventPopup = ()=>{
		this.popupholder.current.style.display = "flex";
		this.popupholder.current.classList.remove("fade-out");
		this.popupholder.current.classList.toggle("fade-animation");
		this.popup.current.classList.add('slide-from-bottom');
	}

	render() {
		let events;
		let classes = ["dashboard-dropdown"];

		if (this.state.filteredEvents.length === 0) {
			events = this.state.events;
		} else {
			events = this.state.filteredEvents;
		}

		let user;

		if (sessionStorage.getItem("token") !== null) {
			user = (
				<div className="dashboard-account-box">
					<span className="home-title">
						Hello {sessionStorage.getItem("firstName")}{" "}
						{sessionStorage.getItem("lastName")}!
					</span>
					<img src={UserImage} className="db-user-image" alt="userImage"></img>
				</div>
			);
		} else {

			user = (
				<div className="dashboard-account-box">
					<span className="home-title">
						Hello Guest!
					</span>
					<img src={UserImage} className="db-user-image" alt="userImage"></img>
				</div>
			);

		}

		return (
			<div>
				<div className="content-holder">

						<div className="dashboard-topbox">{user}</div>
						<span className="explore-title">
							Explore what's happening nearby!
						</span>

						<div className="dashboard-events-topbox">
							<span className="dashboard-event-title">Events</span>
							<Dropdown
								classes={classes}
								placeholder="Category"
								itemslist={this.state.categories}
								callback={this.setCategory}
							></Dropdown>
						</div>
						<div className="db-row">
							{events.map((event, index) => {
								let columnclass = 'db-column';

								if(index === events.length - 1){
									columnclass += ' db-margincolumn';
								}

								return(
								<div className={columnclass} key={`db-column-${index}`} onClick={() => this.redirectToEvent(event.id)}>
								<div className="db-event">
									{event.category.name == "Sports" && (
										<img src={EventImage} className="db-event-image"></img>
									)}
									{event.category.name == "Cultural" && (
										<img src={Evoluon} className="db-event-image"></img>
									)}
									{event.category.name == "Party" && (
										<img src={Party} className="db-event-image"></img>
									)}
									{event.category.name == "Workshops" && (
										<img src={Workshop} className="db-event-image"></img>
									)}
									<div className="db-eventtitles-box">
										<span className="db-event-title" classkey={event.id}>{event.name}</span>
										<span className="dv-eventlocation-title">{event.location.name}</span>
									</div>	
								</div>
							</div>
							)
							})}
						</div>
	
				</div>
				<Navbar openpopup={this.OpenEventPopup}  callback={(value) => this.redirect(value)} />
				<div ref={this.popupholder} className="popup-holder" onClick={this.CloseEventPopup}>
                <div ref={this.popup} className="event-popup">
               		<div className="centerbox" onClick={() => setTimeout(() => {
						   this.redirect('/createevent')
					   }, 510)}>
                 	 	<img src={eventicon} alt="" className="eventicon"/>
                 		<div className="db-eventtitles-box">
                       		<span className="db-event-title">Event</span>
                        	<span>Meet people and create an event</span>
                    	</div>
                </div>
                </div>
            </div>
			</div>
		);
	}
}
