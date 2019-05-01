import React from "react";

const YelpInfo = (props) => (
    <div className="yelp_info">
            {
                props.name &&
                <p className="weather__key">Name: 
                    <span className="weather__value">{" "+props.name}</span>
                </p>
            }         
            {
                props.url && 
                <p className="weather__key">URL: 
                    <a className="weather__value" href={props.url}>{" "+props.url}</a>
                </p>
            }
            {
                props.display_phone && 
                <p className="weather__key">Phone Number: 
                    <span className="weather__value">{" "+props.display_phone}</span>
                </p>
            }
            {
                props.rating && 
                <p className="weather__key">Rating: 
                    <span className="weather__value">{" "+props.rating}</span>
                </p>
            }
            {
                props.location && 
                <p className="weather__key">Address: 
                    <a className="weather__value" href={"https://www.google.com/maps/place/"+(props.location).replace(/ /g, "+")+""}>{" "+props.location}</a>
                </p>
            }
            {
                props.yelpcity && 
                <p className="weather__key">City: 
                    <span className="weather__value">{" "+props.yelpcity}</span>
                </p>
            }
            {
                props.photos && 
                <p className="weather__key">Photos:
                    <img className="weather__value" src={props.photos} alt="image" height="250px" width="250px">{}</img>
                </p>
            }
            {
                props.hours && 
                <p className="weather__key">Is it open?: 
                    <span className="weather__value">{" "+props.hours}</span>
                </p>
            }
            {
                props.error && <p className="weather__error">{" "+props.error}</p>
            }
    </div>
);


export default YelpInfo;