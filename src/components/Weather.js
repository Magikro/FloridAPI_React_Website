import React from "react";

const Weather = (props) => (
        <div className="weather_info">

            {
                props.icon && 
                <p className="weather__key">
                    <img src={props.icon} alt=""></img>
                </p>
            }
            {
                props.city &&
                <p className="weather__key">Location: 
                    <span className="weather__value">{" "+props.city}</span>
                </p>
            }         
            {
                props.temperatureF && props.temperatureC && props.humidity && 
                <p className="weather__key"> 
                    <span className="weather__value">{" "+props.temperatureF}°F/{" "+props.temperatureC}°C, </span>
                    <span className="weather__value">{"Humidity: "+props.humidity+", "}</span>
                    <span className="weather__value">{"Conditions: "+props.description+" "}</span>
                </p>
            }
            {
                props.error && <p className="weather__error">{" "+props.error}</p>
            }
        </div>


    );


export default Weather;