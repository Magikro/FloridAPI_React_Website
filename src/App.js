import React from 'react';
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import Yelp from "./components/Yelp";
import logo from './components/img/tree.png';

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const time = e.target.elements.time.value;
    const api_call = await fetch(`http://10.185.186.22:3000/weather?cityName=${city}&time=${time}`, {mode:'cors'});

    const data = await api_call.json();   
    if(city && time) {
      // eslint-disable-next-line
      if(data.cod == 404) {
        this.setState({
          temperature: undefined,
          city: undefined,
          humidity: undefined,
          description: undefined,
          error: "Input doesn't match any known location!"
      });
    } else {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } 
  } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter a city name and current/forecast"
      });
    }
  }

  getYelp = async (e) => {
    e.preventDefault();
    const location = e.target.elements.location.value;
    const something = e.target.elements.something.value;
    const yelp_api_call = await fetch(`http://10.185.197.29:3000/yelp?term=${something}&location=${location}`);

    const data = await yelp_api_call.json();
  }

  
  render() {
    return (


      <div className="form-container">
      <div className="title-container">
      
        <Titles/>
        <img src={logo} alt="Logo" width="500px" height="500px"/>
        </div>
         
         <Form getWeather={this.getWeather}/>
            <Weather 
              temperature={this.state.temperature}
              city={this.state.city}
              humidity={this.state.humidity}
              description={this.state.description}
              error={this.state.error}
            />
          <Yelp getYelp={this.getYelp}/>
        </div>

    );
  }
}

export default App;
