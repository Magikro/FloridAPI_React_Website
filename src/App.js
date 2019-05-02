import React from 'react';
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import logo from './components/img/tree.png';
import YelpInfo from './components/YelpInfo';
import YelpBusiness from './components/YelpBusiness';

var api_call;
var yelp_api_call;
var celsius;
var fahrenheit;

class App extends React.Component {
  state = {
    temperatureF: undefined,
    temperatureC: undefined,
    businesses: undefined,
    city: undefined,
    humidity: undefined,
    description: undefined,
    name: undefined,
    yelpcity: undefined,
    url: undefined,
    display_phone: undefined,
    rating: undefined,
    location: undefined,
    photos: undefined,
    hours: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const location = e.target.elements.city.value;
    const something = e.target.elements.something.value;

    Promise.all([
    api_call = await fetch(`http://10.185.197.29:3000/weather?cityName=${city}&time=forecast`, {mode:'cors'}),
    yelp_api_call = await fetch(`http://10.185.197.29:3000/yelp?term=${something}&location=${location}`, {mode:'cors'})]);
    


    const data = await api_call.json();
    if(city) {

      // eslint-disable-next-line
      if(data.cod == 404) {
        this.setState({
          temperatureF: undefined,
          temperatureC: undefined,
          city: undefined,
          humidity: undefined,
          description: undefined,
          error: "Input doesn't match any known location!"
      });
    } else {

        celsius = parseFloat((data.list[0].main.temp) - 273.15).toFixed(2);
        fahrenheit = ((celsius * 9/5) + 32).toFixed(2);
        this.setState({
          temperatureF: fahrenheit,
          temperatureC: celsius,
          city: data.list[0].name,
          humidity: data.list[0].main.humidity,
          description: data.list[0].weather[0].description,
          error: ""
        });

    } 
  } else {
      this.setState({
        temperatureF: undefined,
        temperatureC: undefined,
        city: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter a city name."
      });
    }

    
    const data1 = await yelp_api_call.json();
    if(location && something) {
      // eslint-disable-next-line
      if(data1.cod == 404) {
        this.setState({
          name: undefined,
          url: undefined,
          display_phone: undefined,
          rating: undefined,
          location: undefined,
          yelpcity:undefined,
          photos: undefined,
          hours: undefined,
          error: "Input doesn't match any known location!"
      });
    } else {
      this.setState({
        name: data1.businesses[0].name,
        url: data1.businesses[0].url,
        display_phone: data1.businesses[0].display_phone,
        rating: data1.businesses[0].rating,
        location: data1.businesses[0].location.address1,
        yelpcity: data1.businesses[0].location.city,
        photos: data1.businesses[0].image_url,
        hours: data1.businesses[0].is_closed,
        businesses: data1,
        error: ""
      });
      console.log(this.state.businesses);
    } 
  } else {
      this.setState({
        name: undefined,
        url: undefined,
        display_phone: undefined,
        rating: undefined,
        location: undefined,
        yelpcity:undefined,
        photos: undefined,
        hours: undefined,
        error: "Please enter something to search."
      });
    }
  }

  
  render() {
    return (


      <div className="form-container">
      <div className="title-container">
      
        <Titles/>
        <img src={logo} alt="Logo" className="logoImg"/>
      </div>
         
         <Form getWeather={this.getWeather}/>
            <Weather 
              temperatureF={this.state.temperatureF}
              temperatureC={this.state.temperatureC}
              city={this.state.city}
              humidity={this.state.humidity}
              description={this.state.description}
              error={this.state.error}
            />
            <YelpInfo 
            name={this.state.name}
            url={this.state.url}
            display_phone={this.state.display_phone}
            rating={this.state.rating}
            location={this.state.location}
            yelpcity={this.state.yelpcity}
            photos={this.state.photos}
            hours={this.state.hours}
            />
            <YelpBusiness businesses={this.state.businesses}/>
        </div>

    );
  }
}

export default App;
