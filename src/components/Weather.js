import React from "react";

const Weather = (props) => ( //Weather.js in all of it's glory.
        <div className="weather_info">

            {// Setting the icon from the data from App.js
                props.icon && 
                <p className="weather__key">
                    <img src={props.icon} alt=""></img> 
                </p>
            }
            { //Same thing as icon but with city.
                props.city &&
                <p className="weather__key">Location: 
                    <span className="weather__value">{" "+props.city}</span>
                </p>
            }         
            { // You get it.
                props.temperatureF && props.temperatureC && props.humidity && 
                <p className="weather__key"> 
                    <span className="weather__value">{" "+props.temperatureF}°F/{" "+props.temperatureC}°C, </span>
                    <span className="weather__value">{"Humidity: "+props.humidity+", "}</span>
                    <span className="weather__value">{"Conditions: "+props.description+" "}</span>
                </p>
            }
            { //In case there's an error, we set the error message too!
                props.error && <p className="weather__error">{" "+props.error}</p>
            }
        </div>


    );


export default Weather;