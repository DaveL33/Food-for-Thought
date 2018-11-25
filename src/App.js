import React, { Component } from 'react'; //import React Component
//import './style.css';
import 'whatwg-fetch';
import './App.css';
//var rapid = new RapidAPI("default-application_5bf3605ee4b02e4415402cd8", "99f1d82f-be7b-42ee-9ec2-b4f3c7f8c138");
import $ from 'jquery'; 

export class App extends Component {

  /*fetchData() {

    
   let url = 'https://developers.zomato.com/api/v2.1/location_details?entity_id=279&entity_type=city';
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
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.error(error);
    });  
  }*/

  constructor(props) {
    super();
    this.state = {
      cityName:'',
      category:[],
      introComp:false,
      categoryComp:true,
      restaurantsComp:true,
      categoryID:[]
    }
  }

  handle = (state) => {
    this.setState(state);
    this.setState({
      introComp:true,
      categoryComp:false
    });
  } 

  chosen = (state) => {
    this.setState(state);
    this.setState({
      introComp:true,
      categoryComp:true,
      restaurantsComp:false
    });
    
  }
  
  render() {
    return (
      <div className="bodyContainer">
        <div className="container">
          <h1>Food for Thought</h1>
          <Intro active={this.state.introComp} data={this.handle}></Intro>
          <Category idChosen={this.chosen} data={this.state} active={this.state.categoryComp}></Category>
          <Restaurants active={this.state.restaurantsComp} data={this.state}></Restaurants>
        </div>
      </div>

    )
  }
}

class Intro extends Component {
  constructor(props) {
    super();
    this.state = {
      cityName:"",
      category:[],
      cityID:null
    }
  }

  handleChange = ({target}) => {
    this.setState({
      cityName:target.value
    })
    console.log(this.state)
  }

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

  render() {
    return(
      <div hidden={this.props.active} className="introContainer">
        <div className="introContent">
          <h5><strong>Food for Thoughts</strong> is an app that helps users decide what restaurant to eat at.</h5>
          <p>Input your zip code and amount of money your willing to spend below to get started!</p>
        </div>
        <div className="zipMoney">
          <div className="zipCode">
            <input onChange={this.handleChange} type="textarea"/>
            <label>Zip Code</label>
          </div>
          <div className="money">
            <h6>$$$</h6>
            <label>Price Range</label>
          </div>
        </div>
        <div className="footer">
          <div onClick={this.fetchData}className="arrowSubmit">
            >>>
          </div>
        </div>
      </div>
    );
  }
}

class Category extends Component {
  constructor(props) {
    super();
    this.state = {
      categoryID:[]
    }
  }

  handle = (id) => {
    this.state.categoryID.push(id);
    console.log("donut");
    console.log(this.state);
    this.props.idChosen(this.state);
  }

  render() {
    let data = this.props.data;
    console.log(data)
    return (
      <div hidden={this.props.active}>
        <h5>To fetch accurate restaurants that match your cravings, we'll need you to answer a few questions.</h5>
        <p>Select your preferred category below.</p>
        <CuisineList catID={this.handle} data={data}></CuisineList>
      </div>
    );
  }
}

class Card extends Component {
  constructor(props) {
    super();
  }
  render() {
    let category = this.props.category;
    return(
      <div data-key={category.id} className="categoryCard">
        <h3>
          {category.name}
        </h3>
      </div>
    );
  }
}

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
    console.log("sent");
    console.log(this.state.categoryIDs);
    this.props.catID(this.state.categoryIDs);
  }

  render() {
    let data = this.props.data.category;
    console.log(data);
    let categories = data.map(category => {
      let comp = <Card category={category}></Card>
      return comp;
    });
    return(
      <div>
        <div onClick={this.send} className="arrowSubmit">
          >>>
        </div>
        <div onClick={this.chosen}>
          {categories}
        </div>
      </div>
    );
  }
}

class Restaurants extends Component {
  constructor(props) {
    super();
    this.state = {
      restaurants:null
    }
  }

  fetchRestaurants(categoryIDs, cityID) {
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
            price:restaurant.price_range
          }
          let comp = <Card category={category}></Card>
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
    let cityID = this.props.data.cityID;
    this.fetchRestaurants(categoryIDs[0], cityID);
    let restaurantsDisplay;
    if(this.state.restaurants != null) {
      restaurantsDisplay = this.state.restaurants;
    }
    return(
      <div hidden={this.props.active}>
        <h5>To fetch accurate restaurants that match your cravings, we'll need you to answer a few questions.</h5>
        <p>Select five restaurants from below.</p>
        {restaurantsDisplay}
      </div>
    );
  }
}

export default App;