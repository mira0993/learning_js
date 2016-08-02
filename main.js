import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute} from 'react-router';
import OnSite from './components/OnSite.jsx';
import UrlForm from './components/Form.jsx';
import UrlsGeneric from './components/URLs.jsx';
import SingleURL from './components/SingleURL.jsx';
import { NavBar } from './components/NavBar/NavBar.jsx';

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

// The app will have only the navigation bar to keep it visible always.
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

// React router declaration.
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={OnSite}/>
      <Route path="/onsite/:urlId" url='/urls/' short_prefix={'/s/'} alias_prefix={'/a/'} component={SingleURL}/>
      <Route path="/onsite" short_prefix={'/s/'} alias_prefix={'/a/'} component={UrlsGeneric}/>
      <Route path="/form" short_prefix={'/s/'} alias_prefix={'/a/'} component={UrlForm}/>
    </Route>
  </Router>
), document.getElementById('react-root-elem'));
