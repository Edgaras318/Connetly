import React, { Component } from "react";
import Textbox from "./Textbox"
import Button from "./Button";

export default class EventCreation extends Component {

    CreateEvent(){
        console.log('test');
    }

	render() {
        

        return(
            <div className="content-holder">
                <span className="page-title">Create your event</span>
                <Dropdown placeholder="Category"></Dropdown>
                <Textbox name="Event name" ></Textbox>
                <Textbox name="Event location"></Textbox>
                <textarea className="textfield" placeholder="Description"></textarea>
                <div className="flex-container">
                    <Dropdown placeholder="Date"></Dropdown> 
                    <Dropdown placeholder="Time"></Dropdown>
                </div>
                <div className="buttons-holder">
                <Button buttonName="Create" callback={this.CreateEvent}></Button>
                <Button buttonName="Cancel" className="outlined"></Button>
                </div>
            </div>
        );
	}
}
