import React from "react";

const Yelp = (props) => (
    <form onSubmit={props.getYelp}>
        <input type="text" name="location" placeholder="Location..."/>
        <input type="text" name="something" placeholder="Search Something"/>
        <button>Search</button>
    </form>
    );


export default Yelp;