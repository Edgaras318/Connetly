import React, {Component} from "react";

export default class Datepickerdays extends Component {
    GenerateDays = ()=>{
        let amountofdays = this.props.daysamount;
        let looper = Math.ceil(amountofdays / 7);
        let output = [];
        let day = 0;

        for(let i = 0; i < looper; i++){
        let children = [];

            for(let j = 0; j < 7; j++){
                day++;
                if(day > amountofdays){
                    children.push(<span className="datepicker-weekday" key={`day-${j}`}></span>);
                }
                else{
                    children.push(<span className="datepicker-weekday" key={`day-${j}`} onClick={(event)=>{this.props.clickcallback(event.target)}}>{day}</span>);

                }
            }   
        output.push(<div className="datepicker-horizontal-box" key={`box-${i}`}>{children}</div>);
        }
    return <div className="datepicker-numberdays-box">{output}</div>;
    }

    render() {
        return (
                this.GenerateDays()
        )
    }
}