import React, { Component } from 'react'; //import React Component
//import './style.css';
import 'whatwg-fetch';
//var rapid = new RapidAPI("default-application_5bf3605ee4b02e4415402cd8", "99f1d82f-be7b-42ee-9ec2-b4f3c7f8c138");
import $ from 'jquery'; 

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output:"",
      zip:98105,
      money:1
    };
    this.changeZip=this.changeZip.bind(this);
    this.changeMoney=this.changeMoney.bind(this);
    this.handleClick=this.handleClick.bind(this);
  }
  changeZip(event) {
    this.setState({zip: event.target.value});
  }
  changeMoney(event) {
    this.setState({money: event.target.id});
  }

  handleClick(event) {
    this.fetchData();
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    /*
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.yelp.com/v3/businesses/search?location=98105&price=1",
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer y6ejhnqhtEk8B98G2JP-_WR9-sNpB_ELeiG-Hh4l5FVrqy67Yg_ypYpWnXShYcoKu39n_UsNlAIzHUJryWSWcR7M0w8_FDNPILRfvL7nss6iFRf7864tBRw9tlzzW3Yx",
        "cache-control": "no-cache",
        "Postman-Token": "766a33bc-b1d2-4c25-b63a-d115b0e3b150"
      },
      "processData": false,
      "data": ""
    }
    
    $.ajax(settings).done(function (response) {
      console.log(response);
    });
    */

    let url = 'https://api.yelp.com/v3/businesses/search';
    url +=('?location='+ this.state.zip + '&price=' + this.state.money);
    return fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer y6ejhnqhtEk8B98G2JP-_WR9-sNpB_ELeiG-Hh4l5FVrqy67Yg_ypYpWnXShYcoKu39n_UsNlAIzHUJryWSWcR7M0w8_FDNPILRfvL7nss6iFRf7864tBRw9tlzzW3Yx",
        "cache-control": "no-cache"
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
  }
  
  render() {

    return (
      <div>
        <h1>Food for Thots</h1>
        <h5>Food for Thots is an app that helps users decide what restaurant to eat at.</h5>
        <h5>Input your zip code and amount of money your willing to spend below to get started!</h5>
        <br/>
        <div id="inputs">
          <label>Zip code</label><br/>
          <input type="textarea" placeholder="im a fag" onChange={this.changeZip}></input><br/><br/>
          <form>
            <label>How much ya wana spend bud</label>
            <div id="group">
              <input type="radio" id="1" name="faggot" onChange={this.changeMoney}></input>
              <label> $ </label> <br/>
              <input type="radio" id="2" name="faggot" onChange={this.changeMoney}></input>
              <label> $$ </label><br/>
              <input type="radio" id="3" name="faggot" onChange={this.changeMoney}></input>
              <label> $$$ </label><br/>
              <input type="radio" id="4" name="faggot" onChange={this.changeMoney}></input>
              <label> $$$$ </label><br/>
            </div>
            <button id="go" onClick={this.handleClick}>Go</button>
          </form>
        </div>
      </div>

    )
  }
}

export default App;