import React from "react";

const Form = (props) => ( //The Form!


<form onSubmit={props.getWeather} className="formBoy">
<div >
<div className="row">
  <div className="col-auto">
  <input type="text" className="form-control" name="city" placeholder="City..."/>
  </div>
  <div className="col-auto">
  <input type="text" className="form-control" name="something" placeholder="Search Something to do"/>
  </div>
</div>
<button className="btn btn-primary">Submit</button>
</div>
</form>
);

export default Form;