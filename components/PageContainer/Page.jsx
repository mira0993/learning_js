import React from 'react';

// Basic header
var PageHeader = React.createClass({
  render: function(){
    return(
      <div className="page-header">
        <div className="row">
          <div className="col-lg-8 col-md-7 col-sm-6">
            <h1>{this.props.children}</h1>
          </div>
        </div>
      </div>
    )

  }
});

// Container of all the page
var PageContent = React.createClass({
  render: function(){
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="bs-component">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
})

module.exports.PageHeader = PageHeader;
module.exports.PageContent = PageContent;
