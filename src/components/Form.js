import React from "react";

const Form = (props) => (
    <form onSubmit={props.getWeather} className="formBoy">
        <input type="text" name="city" placeholder="City..."/>
        <input type="text" name="something" placeholder="Search Something to do"/>
        <button>Search</button>
    </form>
);

export default Form;