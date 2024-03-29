import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Buffer } from 'buffer';
import logo from '../logo.svg';
import '../App.css';
import API_URL from '../config';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: {},
      isLoading: true,
    };
  }

  callAPI() {
    fetch(`${API_URL}` || 'http://localhost:8080', {
      // mode: 'cors',
      // credentials: 'include'
    })
      .then((res) => res.json())
      .then((res) => this.setState({ apiResponse: res }))
      .then(() => this.setState({ isLoading: false }))
      .catch((err) => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  displayMainArticle(article) {
    if (article === null) {
      return console.log('article returned null');
    } else {
      console.log(article._id,'article title')
      //aggregate result changes output to javascript object instead of model object. no need to convert image data to string (base64) anymore since it outputs string already?
      // let buffer = new Buffer.from(article.image.data);
      // let mimetype = article.image.contentType;
      const options = {
        year: "numeric",
        month: "long", 
        day: "numeric",
      }
      const url = '/blogs/' + article._id;
      const date = new Date(article.date).toLocaleDateString("en-US", options)
      return (
        <div key={article._id} className="main-article">
          <div className="main-black-gradient">
            <div className="main-details-container">
              <p className="category-tag">{article.category.category}</p>
              <p className="latest-post-date">
                <span className="article-user">By {article.user.username}</span>
                <span>&#8226;</span>
                <span className="article-date">{date}</span>
              </p>
              <Link className="nav-link main-title" to={url}>
                <h4>{article.title}</h4>
              </Link>
              <p>{article.summary}</p>
            </div>
            <img
              alt="article"
              className="main-image"
              src={article.image.secure_url}
            />
          </div>
        </div>
      );
    }
  }

  displayPost(article) {
    // let buffer = new Buffer.from(article.image.data.data).toString('base64');
    // let mimetype = article.image.contentType;
    return (
      <div key={article._id} className="home-category-article">
        <div className="home-details-container">
          <h4>
            <Link className="nav-link home-category-title" to={article.url}>
              {article.title}
            </Link>
          </h4>
          <p className="home-category-summary">{article.summary}</p>
          <p className="home-category-date">{article.date_formatted}</p>
        </div>
        <div className="home-image-container">
          <img
            alt="article"
            className="home-category-image"
            src={article.image.secure_url}
          />
        </div>
      </div>
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Loading...</p>
          </header>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header>
            {this.displayMainArticle(this.state.apiResponse.main_article)}
          </header>
          <main className="home-category-container">
            <hr></hr>
            <section className="home-category">
              <div className="home-category-header">
                <h1>business</h1>
                <Link
                  className="home-category-link nav-link"
                  to="category/63433c0bf956b9ec2934ecdc"
                >
                  <p className="article-date-user">See all</p>
                </Link>
              </div>
              {this.displayPost(this.state.apiResponse.business_article)}
            </section>
            <hr></hr>
            <section className="home-category">
              <div className="home-category-header">
                <h1>politics</h1>
                <Link
                  className="home-category-link nav-link"
                  to="category/633d2bd499336cb4c9381d17"
                >
                  <p className="article-date-user">See all</p>
                </Link>
              </div>
              {this.displayPost(this.state.apiResponse.politics_article)}
            </section>
            <hr></hr>
            <section className="home-category">
              <div className="home-category-header">
                <h1>science</h1>
                <Link
                  className="home-category-link nav-link"
                  to="category/63433c35f956b9ec2934ecf8"
                >
                  <p className="article-date-user">See all</p>
                </Link>
              </div>
              {this.displayPost(this.state.apiResponse.science_article)}
            </section>
            <hr></hr>
            <section className="home-category">
              <div className="home-category-header">
                <h1>health</h1>
                <Link
                  className="home-category-link nav-link"
                  to="category/63433c39f956b9ec2934ed06"
                >
                  <p className="article-date-user">See all</p>
                </Link>
              </div>
              {this.displayPost(this.state.apiResponse.health_article)}
            </section>
            <hr></hr>
            <section className="home-category">
              <div className="home-category-header">
                <h1>technology</h1>
                <Link
                  className="home-category-link nav-link"
                  to="category/63433c30f956b9ec2934ecea"
                >
                  <p className="article-date-user">See all</p>
                </Link>
              </div>
              {this.displayPost(this.state.apiResponse.technology_article)}
            </section>
          </main>
        </div>
      );
    }
  }
}

export default Home;
