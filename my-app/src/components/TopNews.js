import React, { Component } from 'react';
import "../TopNews.css"

const authKey = "0701279aa1ce4d48850426a4a74c7b28";

const queryURLBase = 'https://newsapi.org/v2/top-headlines?' +
  'country=us&apiKey=' + authKey;

const searchUrl = 'https://newsapi.org/v2/everything?' +
  'q={query}&' +
  'sortBy=popularity&' +
  'apiKey=' + authKey;

export default class TopNews extends Component {
  constructor(props) {
    super(props)
    this.state = { data: [], numArticles: 5, query: '' }
    this.handleNumChange = this.handleNumChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.fetchNews = this.fetchNews.bind(this)
    this.handleQueryChange = this.handleQueryChange.bind(this)
  }

  handleNumChange(e) {
    e.preventDefault();
    let datacopy = this.state.data;
    let qcopy = this.state.query;
    this.setState({ data: datacopy, numArticles: e.target.value, query: qcopy })
  }
  handleQueryChange(e) {
    e.preventDefault();
    let datacopy = this.state.data;
    let numcopy = this.state.numArticles;
    this.setState({ data: datacopy, numArticles: numcopy, query: e.target.value })
  }

  fetchNews() {
    if (this.state.query == "") {
      fetch(queryURLBase, {
        method: "GET"
      }).then(res => {
        if (!res.ok) {
          throw Error("error")
        }
        return res.json()
      }).then(data => {
        let numcopy = this.state.numArticles;
        let qcopy = this.state.query;
        this.setState({ data: data.articles, numArticles: numcopy, query: qcopy })
      }).catch(function (error) {
        console.log(error)
      })
    } else {
      let tmpQuerySearch = searchUrl.replace("{query}", this.state.query)
      fetch(tmpQuerySearch, {
        method: "GET"
      }).then(res => {
        if (!res.ok) {
          throw Error("error")
        }
        return res.json()
      }).then(data => {
        let numcopy = this.state.numArticles;
        let qcopy = this.state.query;
        this.setState({ data: data.articles, numArticles: numcopy, query: qcopy })
      }).catch(function (error) {
        console.log(error)
      })
    }
  }

  handleClick(e) {
    e.preventDefault();
    if (e.target.id == "runQuery") {
      this.fetchNews();
    } else {
      this.setState({ data: [] })
    }
  }

  render() {
    return (
      <div aria-hidden="true" className="rightContainer" id="top">
        <img src="images/news.jpg" alt="News text." style={{ width: '100%', height: '300px', padding: '0px' }} />
        <div aria-label="panel to change parameters to filter news" class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title"><strong><i class="fa  fa-list-alt"></i>   Search Parameters</strong></h3>
          </div>
          <div class="panel-body">
            <form role="form">
              <div aria-label="input search text to get news" class="form-group">
                <label for="search">Search Term:</label>
                <input type="text" class="form-control" id="searchTerm" value={this.state.query} onChange={this.handleQueryChange} placeholder="Type a search term or simply hit Get Top News!" />
              </div>

              <div aria-label="select number of articles to display" class="form-group">
                <label for="pwd">Number of Articles to retrieve:</label>
                <select class="form-control" id="numArticles" onChange={this.handleNumChange}>
                  <option value="1">1</option>
                  <option value="5" selected>5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
              </div>

              <button aria-label="button to get data" class="btn btn-primary" id="runQuery" onClick={this.handleClick} >Get Top News</button>
              <button aria-label="button to clear news" type="button" class="btn btn-default" id="clearAll" onClick={this.handleClick}><i class="fa fa-trash"></i> Clear Results</button>
            </form>
          </div>
        </div>
        <Results news={this.state.data} numArticles={this.state.numArticles} />
      </div>
    )
  }
}


{/*The component displays the news in a formatted form. */ }
class Results extends Component {

  render() {
    if (typeof this.props.news != "undefined") {
      var response = this.props.news.slice(0, this.props.numArticles)
      var newsArtics = response.map((newsArt, index) => <div id="article-data">
        <h2><span className="label label-primary">{index + 1}</span><a href={newsArt.url} target="_blank"><strong>{newsArt.title}</strong></a></h2>
        <div className='row justify-content-between' style={{ margin: 0 }}>
          <div aria-label="information about news" className='col-sm-8'>
            <h3> {newsArt.description}</h3>
            <p id ="article-source"><strong>Source:</strong> {newsArt.source.name}</p>
            <p id="article-desc">{newsArt.content}</p>
          </div>
          <div aria-label="image for the news" className="col-sm-4">
            <img src={newsArt.urlToImage} alt={newsArt.title} />
          </div>
        </div>
      </div>
      )
    } else {
      var newsArtics = []
    }

    return (
      <div className="container" aria-hidden="true" id="articles">
        <h1> Top News </h1>

        {newsArtics}

      </div>
    )
  }
}
