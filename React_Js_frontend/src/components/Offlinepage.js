import React, {Component} from "react";
import gif from '../assets/offline-gif.gif';
import topbg from '../assets/offline-top.png';
import bottombg from '../assets/offline-bottom.png';

export default class Offlinepage extends Component {

    render() {
        return (
            <div className="offline-box">
                <img src={topbg} className="offline-page-background"/>
                <img src={gif} className="offline-gif"/>
                <img src={bottombg} className="offline-page-background"/>
            </div>
        )
    }
}