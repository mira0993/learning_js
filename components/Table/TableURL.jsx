import React from 'react'

// Table Cell
var LinkCell = React.createClass({
  render: function(){
    return(
      <td>
        <a target="_blank" href={this.props.children}>{this.props.children}</a>
      </td>
    )
  }
})

// URLs Table. Show all the URLs aliases availables.
var Table = React.createClass({

  // Get the data from the server with /urls
  loadURLsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data.data, server: data.server});
      }.bind(this),
      error: function(xhr, status, err) {
        alert(err.toString());
      }.bind(this)
    });
  },

  getInitialState: function(){
    return {data:[], server:'localhost'};
  },

  // Do the Get after the first render.
  componentDidMount: function(){
    this.loadURLsFromServer();
  },

  render: function(){
    var prefix = 'http://'+this.state.server+this.props.prefix;
    var tableHeaders = this.props.table_headers.map(function(header){
      return <th key={'th_'+header.replace(' ','_')}>{header}</th>
    });

    var tableRows = this.state.data.map(function(row){
        var cols=[];
        var search='?alias=true';
        if(!row.alias)
          search='?short=true';
        cols.push(<td key={'col1_'+row['_id']}><a className="btn btn-default btn-xs"
        href={'onsite/'+row['_id']+search}>View</a></td>)
        if('alias' in row)
          cols.push(<LinkCell key={'col2_'+row['_id']}>{prefix+row['alias']}</LinkCell>)
        if('original' in row)
          cols.push(<td key={'col3_'+row['_id']}>{row['original']}</td>);
        if('short' in row)
          cols.push(<LinkCell key={'col4_'+row['_id']}>{prefix+row['short']}</LinkCell>)
        return(
          <tr key={'row_'+row['_id']}>
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
