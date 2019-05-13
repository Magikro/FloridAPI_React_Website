import React from 'react';
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import logo from './components/img/tree.png';
import 'bootstrap/dist/css/bootstrap.css';

var api_call;
var yelp_api_call;
var celsius;
var fahrenheit;

class App extends React.Component {
  state = {
    temperatureF: undefined,
    temperatureC: undefined,
    businesses: [],
    icon: undefined,
    city: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    error2: undefined
  }
  

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const location = e.target.elements.city.value;
    const something = e.target.elements.something.value;

    Promise.all([
    api_call = await fetch(`http://10.185.197.29:3000/weather?cityName=${city}&time=current`, {mode:'cors'}),
    yelp_api_call = await fetch(`http://10.185.197.29:3000/yelp?term=${something}&location=${location}`, {mode:'cors'})]);
    

    
    const data = await api_call.json();
    console.log(data);
    if(city) {
      // eslint-disable-next-line
      if(data.cod == 404 || data.main == undefined) {
        this.setState({
          temperatureF: undefined,
          temperatureC: undefined,
          city: undefined,
          humidity: undefined,
          description: undefined,
          icon: undefined,
          error: "Input doesn't match any known weather location!"
      });
    } else {

        celsius = parseFloat((data.main.temp) - 273.15).toFixed(2);
        fahrenheit = ((celsius * 9/5) + 32).toFixed(2);
        this.setState({
          temperatureF: fahrenheit,
          temperatureC: celsius,
          city: data.name,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          icon: "http://openweathermap.org/img/w/"+ data.weather[0].icon + ".png",
          weathers: data,
          error: ""
        });
        console.log(this.state.icon);
    } 
  } else {
      this.setState({
        temperatureF: undefined,
        temperatureC: undefined,
        city: undefined,
        humidity: undefined,
        description: undefined,
        icon: undefined,
        error: "Please enter a city name."
      });
    }

    
    const data1 = await yelp_api_call.json();
    if(location && something) {
      // eslint-disable-next-line
      if(data1.cod == 404) {
        this.setState({

          error2: "Input doesn't match any known location!"
      });
    } else {
      this.setState({

        businesses: data1.businesses,
        error2: ""
      });
      console.log(this.state.businesses);
    } 
  } else {
      this.setState({

        error2: "Please enter something to search."
      });
    }
  }

  
  render() {
    return (


      <div className="form-container">
      <div className="ridiculous">
      <div className="title-container">
      
        
        <img src={logo} alt="Logo" className="logoImg"/>
        <Titles/>
        </div>
         
         <Form getWeather={this.getWeather}/>
            <Weather 
                temperatureF={this.state.temperatureF}
                temperatureC={this.state.temperatureC}
                city={this.state.city}
                humidity={this.state.humidity}
                description={this.state.description}
                icon={this.state.icon}
                error={this.state.error}
              />  
              <div className="yelpStuff">
                <div className="container-fluid">
                  {this.state.businesses.map((businessObj) => {
                    return (
                    <ul className="yelpers">
                    <div className="media">
                      <img src={businessObj.image_url} className="align-self-center mr-3" alt="..." height="270px" width="270px"></img>
                      <div className="media-body">
                        <h1 className="mt-0"><a  href={businessObj.url}>{businessObj.name}</a></h1>
                        <h3>Phone Number: {businessObj.display_phone}</h3>
                        <h3>Rating: {businessObj.rating}</h3>
                        <h3>Address: <a  href={"https://www.google.com/maps/place/"+(businessObj.location.address1).replace(/ /g, "+")+""}>{" "+businessObj.location.address1}</a></h3>
                        <h3>City: {businessObj.location.city}</h3>
                      </div>
                    </div>
                    </ul>
                    )
                  })}
                </div>
              </div>
            </div>
          <div className="footer">
          <p></p>
        </div>
      </div>

    );
  }
}

export default App;
