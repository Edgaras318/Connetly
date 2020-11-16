import React, { Component } from "react";
import homeicon from "../assets/homeicon.svg";
import locationicon from "../assets/locationicon.svg";

export default class Navbar extends Component {
    constructor() {
        super();
    }

	render() {

        return (
          <div className="dashboard-navbar">
            <div className="dashboard-navbar-option align-center" onClick={() => {this.props.callback('#')}}>
              <img className="navbar-option-icon" src={homeicon}/>
            </div>
            <div className="dashboard-navbar-option" onClick={() => {this.props.openpopup()}}>
              <button className="event-popup-button"></button>
            </div>
            <div className="dashboard-navbar-option align-center" onClick={() => {this.props.callback('/locationoverview')}}>
              <img className="navbar-option-icon" src={locationicon}/>
            </div>
          </div>
        )
	}
}