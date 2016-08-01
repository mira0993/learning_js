import React from 'react'

var LinkCell = React.createClass({
  render: function(){
    return(
      <td>
        <a target="_blank" href={this.props.children}>{this.props.children}</a>
      </td>
    )
  }
})
var Table = React.createClass({

  loadURLsFromServer: function() {
    console.log('loadURLsFromServer');
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        alert(err.toString());
      }.bind(this)
    });
  },

  getInitialState: function(){
    return {data:[]};
  },

  componentDidMount: function(){
    this.loadURLsFromServer();
  },


  render: function(){
    var prefix = this.props.prefix;
    var tableHeaders = this.props.table_headers.map(function(header){
      return <th>{header}</th>
    });

    var tableRows = this.state.data.map(function(row){
        var cols=[];
        var search='?alias=true';
        if(!row.alias)
          search='?short=true';
        cols.push(<td><a href={'onsite/'+row['_id']+search}>{row['_id']}</a></td>)
        if('alias' in row)
          cols.push(<LinkCell>{prefix+row['alias']}</LinkCell>)
        if('original' in row)
          cols.push(<td>{row['original']}</td>);
        if('short' in row)
          cols.push(<LinkCell>{prefix+row['short']}</LinkCell>)
        return(
          <tr key={row['_id']}>
            {cols}
          </tr>
        )
    });

    return (
      <table className="table table-striped table-hover ">
        <thead>
          <tr>
            {tableHeaders}
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    );
  }
});

module.exports.Table = Table;
