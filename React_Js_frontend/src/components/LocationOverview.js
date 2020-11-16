import React, {Component} from "react";
import {getAllLocations, deleteLocation} from "../service/LocationService";
import Button from "./Button";
import Map from "../assets/map.png";

export default class LocationOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: []
        };
    }
    componentDidMount() {
        this.loadLocations();
    }

    loadLocations() {
        getAllLocations().then((value) => {
            if (value.status === 200) {
                this.setState({locations: value.data});
            } else {
                console.log("something went wrong");
            }
        });
    }

    delete(id) {
        deleteLocation(id).then((value) => {
            if (value.status === 200) {
                this.loadLocations();
            } else {
                console.log(value);
            }
        }).catch((value) => {
            console.log(value);
        });
    }

    render() {
        return (
            <div>
                <div className="content-holder location-content-holder">
                    <img className="logo" src={Map} alt="userImage"></img>
                    <span className="account-title">All locations</span>

                    {this
                        .state
                        .locations
                        .map(item => {
                            console.log(item);
                            return (
                                <div key={item.id} className="location-box">
                                    <span className="location-name">{item.name}</span>
                                    <Button buttonName="Delete" callback={() => this.delete(item.id)}/>
                                </div>
                            )
                        })
}
                </div>
            </div>
        );
    }
}
