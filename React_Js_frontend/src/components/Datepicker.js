import React, {Component} from "react";
import Datepickerdays from "./Datepickerdays";

export default class Datepicker extends Component {
    constructor(){
        super();
        this.slider = React.createRef();
        this.slidermargin = parseFloat(getComputedStyle(document.body).getPropertyValue('--sliderdaysmargin'));
        this.datepicker = React.createRef();
        this.currentmonth = React.createRef();
    }

    SelectDay = (element)=>{
        if(this.lastclicked != null){
            this.lastclicked.classList.toggle('selected-weekday');
       }
        element.classList.toggle('selected-weekday');
        this.lastclicked = element; 
        this.selectedday = element.innerHTML;
    }

    UpdateSliderValues = ()=>{
        this.translationcount++;
        this.selectedmonth= this.date.getMonth() + this.translationcount;
        this.selectedyear = this.date.getFullYear();
        this.currentmonth.current.innerHTML = this.months[this.selectedmonth] + ' ' + this.selectedyear;
    }

    ArrowSlide = (directionmultiplier)=>{
        this.sliderwidth = parseFloat(getComputedStyle(this.slider.current.querySelector('.datepicker-numberdays-box')).getPropertyValue('width'));
        this.translation += (this.sliderwidth + this.slidermargin) * directionmultiplier;

        this.slider.current.style.transition = 'transform 300ms ease-in-out';
        this.slider.current.style.transform = `translateX(-${this.translation}px)`;

        this.UpdateSliderValues();
    }

    Slide = (event)=>{
        this.sliderwidth = parseFloat(getComputedStyle(this.slider.current.querySelector('.datepicker-numberdays-box')).getPropertyValue('width'));
        let upperparent = this.slider.current.closest('.datepicker-box');
        let startx = event.pageX + this.translation || event.changedTouches[0].pageX + this.translation;
        let updatedx;

        this.OnUp = ()=>{
            this.slider.current.style.transition = 'transform 300ms ease-in-out';
            if(updatedx > this.sliderwidth / 3){
                this.translation = this.sliderwidth + this.slidermargin;
                this.slider.current.style.transform = `translateX(-${this.translation}px)`;
                this.UpdateSliderValues();
            }
            else{
                this.slider.current.style.transform = `translateX(-${this.translation}px)`;
            }

            this.slider.current.ontouchmove = null
            this.slider.current.onmousemove = null;
        }

        this.slider.current.ontouchmove = (e)=>{
            this.slider.current.style.transition = 'unset';
            updatedx = startx - e.changedTouches[0].pageX;
            this.slider.current.style.transform = `translateX(${-updatedx}px)`;
        }

        this.slider.current.onmousemove = (e)=>{
            this.slider.current.style.transition = 'unset'
            updatedx = startx - e.pageX;
            this.slider.current.style.transform = `translateX(${-updatedx}px)`;
        }

        this.slider.current.onmouseup = ()=>{
            this.OnUp();
        }
        
        this.slider.current.ontouchend = ()=>{
            this.OnUp();
        }

        upperparent.onmouseleave = ()=>{
            this.slider.current.style.transition = 'transform 300ms ease-in-out';
            this.slider.current.style.transform = `translateX(-${this.translation}px)`;
            this.slider.current.ontouchmove = null
            this.slider.current.onmousemove = null;
        }
    }

    render() {
        this.months = ['January', 'February', 'March', 'April', 'Mei', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.date = new Date();
        this.translation = 0;
        this.translationcount = 0;
        this.selectedday = null;
        this.selectedmonth= this.date.getMonth();
        this.selectedyear = this.date.getFullYear();

        return (
            <div ref={this.datepicker} className="datepicker-box">
                <div className="datepicker-center-box">
                    <div className="datepicker-top-box">
                        <div className="datepicker-closer datepicker-icon" onClick={()=>{
                            this.selectedday = null;
                            this.props.close()
                            }}></div>
                        <span className="datepicker-title">Date</span>
                        <div className="datepicker-confirmer datepicker-icon" onClick={()=>{
                            if(this.selectedday != null){
                                let date;
                                let dayprefix = '';
                                let monthprefix = '';

                                if(parseFloat(this.selectedday) < 10){
                                    dayprefix = '0';
                                }
                          
                                if(parseFloat(this.selectedmonth) < 10){
                                    monthprefix = '0';
                                }
                          
                                date = this.selectedyear + '-' + monthprefix + this.selectedmonth + '-' + dayprefix + this.selectedday;                                          
                                this.props.confirm(date)
                            }
                            else{
                                console.log('Please choose a day');
                            }
                            }}></div>
                    </div>
                    <div className="datepicker-content-box">
                        <div className="datepicker-content-top-box">
                            <span ref={this.currentmonth} className="datepicker-current-month-year">{this.months[this.date.getMonth()] + ' ' + this.date.getFullYear()}</span>
                            <div className="datepicker-arrows-holder">
                                <div className="datepicker-left-arrow datepicker-arrow" onClick={()=>{this.ArrowSlide(-1)}}></div>
                                <div className="datepicker-right-arrow datepicker-arrow" onClick={()=>{this.ArrowSlide(1)}}></div>
                            </div>
                        </div>
                        <div className="datepicker-weekdays-box">
                            <span className="datepicker-weekday">Mo</span>
                            <span className="datepicker-weekday">Tu</span>
                            <span className="datepicker-weekday">We</span>
                            <span className="datepicker-weekday">Th</span>
                            <span className="datepicker-weekday">Fr</span>
                            <span className="datepicker-weekday">Sa</span>
                            <span className="datepicker-weekday">Su</span>
                        </div>
                        <div className="datepicker-days-carousel">
                            <div ref={this.slider} onTouchStart={(event)=>{this.Slide(event)}} onMouseDown={(event)=>{this.Slide(event)}} className="datepicker-days-slider">
                            <Datepickerdays clickcallback={this.SelectDay} daysamount={31}></Datepickerdays>
                            <Datepickerdays clickcallback={this.SelectDay} daysamount={30}></Datepickerdays>
                            <Datepickerdays clickcallback={this.SelectDay} daysamount={31}></Datepickerdays>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
