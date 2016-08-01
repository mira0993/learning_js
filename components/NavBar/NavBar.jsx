import React from 'react'
import {Link} from 'react-router'

var ToggleNavBar = React.createClass({
  render: function(){
    return (
      <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
    );
  }
})

var NavBarHeader = React.createClass({
  render: function(){
    return (
      <div className="navbar-header">
        <Link to={this.props.header.base_link} className="navbar-brand">{this.props.header.web_title}</Link>
        <ToggleNavBar/>
      </div>
    )
  }
});

var NavBarContent = React.createClass({
  render: function(){
    return (
      <div className="navbar-collapse collapse" id="navbar-main">
        <ul className="nav navbar-nav">
          <li>
            <Link to={this.props.contents.url.link}>{this.props.contents.url.title}</Link>
          </li>
          <li>
            <Link to={this.props.contents.new_form.link}>{this.props.contents.new_form.title}</Link>
          </li>
        </ul>
      </div>
    )
  }
});

var NavBar = React.createClass({
  render: function(){
    return (
        <div className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <NavBarHeader header={this.props.header}/>
            <NavBarContent contents={this.props.contents}/>
          </div>
        </div>
    )
  }
});

module.exports.NavBar = NavBar;
