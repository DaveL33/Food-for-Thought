import React, { Component } from 'react';
//import './style.css';
import 'whatwg-fetch';
import '../TopFood.css';
import {Grid, Row, Col} from 'react-bootstrap'
//var rapid = new RapidAPI("default-application_5bf3605ee4b02e4415402cd8", "99f1d82f-be7b-42ee-9ec2-b4f3c7f8c138");

export default class TopFood extends Component {
    constructor(props) {
        super();
    }

    render() {
        return(
            <div className="rightContainer">
                <Food></Food>
            </div>
        );
    }
}

class Food extends Component {

  constructor(props) {
    super();
    this.state = {
      cityName:'',
      category:[],
      introComp:false,
      categoryComp:true,
      restaurantsComp:true,
      resultsComp:true,
      categoryID:[], 
      price:0
    }
  }

  //Toggles category questions to pop up
  handle = (state) => {
    this.setState(state);
    this.setState({
      introComp:true,
      categoryComp:false
    });
  } 

  //Toggles restaurant grid
  chosen = (state) => {
    this.setState(state);
    this.setState({
      introComp:true,
      categoryComp:true,
      restaurantsComp:false,
      resultsComp:true
    });
    
  }

  //Toggles the chosen restaurant for user
  chosenRestaurants = (state) => {
    this.setState(state);
    this.setState({
      introComp:true,
      categoryComp:true,
      restaurantsComp:true,
      resultsComp:false
    });
  }

  handlePrice = (state) => {
    this.setState({price:state.price});
  }
  
  render() {
    return (
      <div className="bodyContainer">
        <div className="container">
          <h1 aria-label="title">Top Food</h1>
          <Intro active={this.state.introComp} priceRange={this.handlePrice} data={this.handle}></Intro>
          <Category idChosen={this.chosen} data={this.state} active={this.state.categoryComp}></Category>
          <Restaurants restaurantsChosen={this.chosenRestaurants}active={this.state.restaurantsComp} data={this.state}></Restaurants>
          <Results data={this.state} active={this.state.resultsComp}></Results>
        </div>
      </div>

    )
  }
}

//Contains introductory information and enter zip code
class Intro extends Component {
  constructor(props) {
    super();
    this.state = {
      cityName:"",
      category:[],
      cityID:null,
      price:0
    }
  }

  handleChange = ({target}) => {
    this.setState({
      cityName:target.value
    })
  }

  //Grabs data based off city
  fetchCityData() {
    let cityName = this.state.cityName;
    if(cityName.length > 0) {
      let url = 'https://developers.zomato.com/api/v2.1/locations?query=' + cityName;
      return fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "user-key": 'd0325b0e365e86fe688a11fe58eaf786'
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(json => {
        let id = json.location_suggestions[0].entity_id;
        this.setState({cityID:id});
        this.fetchCuisine(id);
      })
      .catch(function(error) {
        console.error(error);
      });  
    }
  }

  //Grabs different categories of restaurants based off city
  fetchCuisine(cityID) {
    let url = 'https://developers.zomato.com/api/v2.1/cuisines?city_id=' + cityID;
    return fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "user-key": 'd0325b0e365e86fe688a11fe58eaf786'
      }
    })
    .then(function(response) {
      return response.json();
    })
    .then(json => {
      let categories = [];
      for(let i = 0; i < json.cuisines.length; i++) {
        let category = {
          name:json.cuisines[i].cuisine.cuisine_name,
          id:json.cuisines[i].cuisine.cuisine_id
        };
        categories.push(category);
      }
      this.setState({category:categories});
      this.props.data(this.state)
      return json;
    })
    .catch(function(error) {
      console.error(error);
    });
  }

  fetchData = () => {
    this.fetchCityData()
  }

  handlePrice = (state) => {
    this.setState({price:state.price});
    this.props.priceRange(this.state);
  };

  render() {
    return(
      <div hidden={this.props.active} className="introContainer">
        <div className="introContent">
          <h5 aria-label="description"><strong>Top Food</strong> will help you pick from the top restaurants around you.</h5>
          <p aria-label="direction">Input your city name below to get started!</p>
        </div>
        <div className="zipMoney">
          <div className="zipCode">
            <input aria-label="input" placeholder="Enter city name" onChange={this.handleChange} type="textarea"/>
            <label>City Name</label>
          </div>
        </div>
        <div className="footer">
          <div onClick={this.fetchData} className="arrowSubmit">
            >>>
          </div>
        </div>
      </div>
    );
  }
}

class Price extends Component {
  constructor(props) {
    super();
    let list = this.setRange();
    this.state = {
      range:list,
      price:0
    }
  }

  highlight = (event) => {
    let price = parseInt(event.target.id);
    this.setState({price:price});
    this.props.priceRange(this.state);
  }

  componentDidMount() {
  }

  setRange() {
    let temp = ['$', '$', '$'];
    let counter = 1;
    let list = temp.map(symbol => {
      let comp = <span onClick={this.highlight} id={counter} className="dollar">{symbol}</span>;
      counter++;
      return comp;
    });
    return list;
  }

  render() {

    return(
      <div className="money">
        {this.state.range}
        <label>Price Range</label>
      </div>
    );
  }
}

//Grid of different categories of restaurants
class Category extends Component {
  constructor(props) {
    super();
    this.state = {
      categoryID:[]
    }
  }

  handle = (id) => {
    this.state.categoryID.push(id);
    this.props.idChosen(this.state);
  }

  render() {
    let data = this.props.data;
    return (
      <div className="categoryContainer" hidden={this.props.active}>
        <div>
          <h5 aria-label="description">To fetch accurate restaurants that match your cravings, we'll need you to answer a few questions.</h5>
          <p aria-label="direction">Select your preferred category below.</p>
        </div>
        <CuisineList catID={this.handle} data={data}></CuisineList>
      </div>
    );
  }
}

//Single card that holds information about either category or restaurant
class Card extends Component {
  constructor(props) {
    super();
  }
  render() {
    let category = this.props.category;
    let comp;
    if(category.address != undefined) {
      comp = <div className="info">
        <h6>{category.address}</h6>
        <h6>{category.rating}</h6>
        <h6>{category.price}</h6>
      </div>
    }
    return(
      <div aria-label="choice" onClick={this.props.onClick} data-key={category.id} className="categoryCard">
        <h5 className="categoryName">
          {category.name}
        </h5>
        {comp}
      </div>
    );
  }
}

//List of categories of food
class CuisineList extends Component {
  constructor(props) {
    super();
    this.state = {
      categoryIDs:[]
    }
  }

  chosen = (event) => {
    let id = event.target.getAttribute("data-key");
    this.state.categoryIDs.push(id);
  }

  send = () => {
    this.props.catID(this.state.categoryIDs);
  }

  active = (event) => {
    let element = event.target;
    element.style.backgroundColor = "#f39c12";
  }

  render() {
    let data = this.props.data.category;
    let categories = data.map(category => {
      let comp = 
          <Col xs={12} md={3}>
            <Card onClick={this.active} category={category}></Card>
          </Col>
      
      return comp;
    });
    return(
      <div>
        <div aria-label="submit" onClick={this.send} className="arrowSubmit">
          >>>
        </div>
        <div onClick={this.chosen}>
          <Grid>
            <Row>

            </Row>
          </Grid>
          {categories}
        </div>
      </div>
    );
  }
}

//List of different types of restaurants based off filters
class Restaurants extends Component {
  constructor(props) {
    super();
    this.state = {
      restaurants:null,
      eliminated:[]
    }
  }

  handleClick = (event) => {
    event.currentTarget.style.backgroundColor = "#f39c12";
    this.state.eliminated.push(event.currentTarget.getAttribute("data-key"));
  };

  send = () => {
    this.props.restaurantsChosen(this.state);
  }

  fetchRestaurants(categoryIDs, cityID, range) {
    if(categoryIDs != undefined && categoryIDs.length > 0) {
      let catID = categoryIDs[0];
      for(let i = 1; i < categoryIDs.length; i++) {
        catID += '%2C%20' + categoryIDs[i];
      }
      let url = 'https://developers.zomato.com/api/v2.1/search?entity_id=' + cityID + '&entity_type=city&cuisines=' + catID + '&order=asc';
      return fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "user-key": 'd0325b0e365e86fe688a11fe58eaf786'
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(json => {
        let restaurants = json.restaurants;
        let list = restaurants.map(restaurantObj => {
          let restaurant = restaurantObj.restaurant;
          let category = {
            name:restaurant.name,
            id:restaurant.id,
            address:restaurant.location.address,
            price:restaurant.price_range,
            rating:restaurant.user_rating.rating_text
          }
          let comp = <Col xs={12} md={3}>
            <Card onClick={this.handleClick} category={category}></Card>
          </Col>
          return comp;
        })
        this.setState({restaurants:list});
        return list;
      })
      .catch(function(error) {
        console.error(error);
      });  
    }
  }

  componentDidMount() {
    
  }

  render() {
    let data = this.props.data;
    let categoryIDs = data.categoryID;
    let range = data.price;
    let cityID = this.props.data.cityID;
    this.fetchRestaurants(categoryIDs[0], cityID, range);
    let restaurantsDisplay;
    if(this.state.restaurants != null) {
      restaurantsDisplay = this.state.restaurants;
    }
    return(
      <div className="restaurantContainer" hidden={this.props.active}>
        <div>
          <h5 aria-label="description">To fetch accurate restaurants that match your cravings, we'll need you to answer a few questions.</h5>
          <p aria-label="direction">Eliminate two restaurants from below.</p>
        </div>
          <Row>
            {restaurantsDisplay}
          </Row>
          <Row>
            <div aria-label="submit" onClick={this.send} className="arrowSubmit">
              >>>
            </div>
          </Row>
      </div>
    );
  }
}

//Chosen restaurant based off filters
class Results extends Component {
  constructor(props) {
    super();
  }

  render() {
    let data = this.props.data;
    console.log(data);
    let result;
    if(data.restaurants != undefined) {
      let eliminated = data.eliminated;
      let restaurants = data.restaurants.filter(restaurant => {
        let id = restaurant.props.children.props.category.id;
        return eliminated.includes(id) == false
      })
      let index = Math.floor(Math.random() * restaurants.length);
      console.log("carrot");
      console.log(restaurants[index]);
      console.log(restaurants[index].props);
      result = <div><h2>Based off your preferences, this is the most ideal restaurant for you!</h2>
      <Card category={restaurants[index].props.children.props.category}></Card></div>
    }
    
    return(
      <div aria-label="result" className="resultContent">
        {result}
      </div>
    );
  }
}