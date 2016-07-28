import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import UrlForm from './components/Form.js';
import UrlsGeneric from './components/URLs.js';

const App = React.createClass({
  render(){
    return(
      <section>
        <div className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">OnSite</Link>
              <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="navbar-collapse collapse" id="navbar-main">
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/urls">URLs</Link>
                </li>
                <li>
                  <Link to="/form">New</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          {this.props.children}
        </div>
      </section>
    )
  }
});


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="urls" component={UrlsGeneric}/>

      <Route path="form" component={UrlForm}/>
    </Route>
  </Router>
), document.getElementById('react-root-elem'));
