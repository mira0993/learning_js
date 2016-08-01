import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import UrlForm from './components/Form.jsx';
import UrlsGeneric from './components/URLs.jsx';
import SingleURL from './components/SingleURL.jsx';
import { NavBar } from './components/NavBar/NavBar.jsx';

var prefix='http://localhost:8080';

var headerObj = {
  'base_link': '/',
  'web_title': 'OnSite'
}

var contentsObj = {
  'url':{
    'link':'/onsite',
    'title':'My URLs'
  },
  'new_form':{
    'link':'/form',
    'title':'New URL'
  }
}

const App = React.createClass({
  render: function(){
    return(
      <section>
        <NavBar header={headerObj} contents={contentsObj}/>
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
      <Route path="/onsite/:urlId" url='/urls/' short_prefix={prefix+'/s/'} alias_prefix={prefix+'/a/'} component={SingleURL}/>
      <Route path="/onsite" prefix={prefix} component={UrlsGeneric}/>
      <Route path="/form"  prefix={prefix} component={UrlForm}/>
    </Route>
  </Router>
), document.getElementById('react-root-elem'));
