import React from 'react';

var Panel = React.createClass({
  render: function(){
    return(
      <div className={'panel panel-'+this.props.panel_type}>
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.panel_title}</h3>
        </div>
        <div className="panel-body">
          {this.props.children}
        </div>
      </div>
  )
  }
})

var MessageWall = React.createClass({

  componentDidMount: function(){
    if(this.props.show === true)
      $("#alertMessage").show();
  },

  componentDidUpdate: function(){
    console.log("update: "+JSON.stringify(this.props));
    if(this.props.show === true)
      $("#alertMessage").show();
    else
      $("#alertMessage").hide();
  },

  render: function(){
    var classesToUse = 'alert alert-dismissible alert-danger';
    if(this.props.type === 'success'){
      classesToUse = 'alert alert-dismissible alert-success';
    }

    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="bs-component">
            <div className={classesToUse} id="alertMessage" hidden>
              <button type="button" className="close">×</button>
              {this.props.message}
            </div>
          </div>
        </div>
      </div>

    )
  }
});

var InputWrapper = React.createClass({
  render: function(){
    return(
      <div className="col-lg-8">
        <div className="well bs-component">
          <form className="form-horizontal">
            <fieldset>
              <legend>{this.props.legend}</legend>
              {this.props.children}
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
});

var InputURL = React.createClass({
  getInitialState: function(){
    return {original: '',
            alias: '',
            enable_alias: false,
            message: '',
            show: false,
            typeOfMsg:'error'};
  },

  handleOriginalChange: function(e){
    this.setState({original: e.target.value});
  },

  handleAliasChange: function(e){
    this.setState({alias: e.target.value});
  },

  handleCheckBoxChange: function(e){
    this.setState({enable_alias: e.target.checked});
    if(e.target.checked)
      $('#inputAlias').prop('disabled', false);
    else
      $('#inputAlias').prop('disabled', true);
  },

  sendInformationToServer: function(){
    var data = {};
    data['original'] = this.state.original;
    if(this.state.enable_alias)
      data['alias'] = this.state.alias;
    console.log(JSON.stringify(data));

    $.ajax({
      url: this.props.url,
      type: 'POST',
      data: data,
      dataType: 'json',
      success: function(data){
        var s_message = '';
        if(data.short)
          s_message=(<p>New Short URL created. View <a target="_blank"
                    href={this.props.short_prefix+data.short}>here</a>.</p>);
        if(data.alias){
          s_message=(<p>New Alias URL created. View <a target="_blank"
                    href={this.props.alias_prefix+data.alias}>here</a>.</p>);
        }

        this.setState({original: '',
                       alias: '',
                       typeOfMsg:'success',
                       message: s_message,
                       show:true});
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({typeOfMsg:'error',
                       message: err.toString()+':  '+xhr.responseText,
                       show:true});
      }.bind(this)
    });
  },

  render: function(){
    return (
      <div>
        <MessageWall show={this.state.show} message={this.state.message} type={this.state.typeOfMsg} />
        <div className="form-group">
          <label htmlFor="inputURL" className="col-lg-2 control-label">URL</label>
          <div className="col-lg-10">
            <input type="text" className="form-control" id="inputURL" value={this.state.original}
              onChange={this.handleOriginalChange} placeholder="Original URL"/>
            <div className="checkbox">
              <label>
                <input type="checkbox" id="enableAliasBox" value='off'
                  onChange={this.handleCheckBoxChange}/>
                  Personalized alias
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAlias" className="col-lg-2 control-label">Alias</label>
          <div className="col-lg-10">
            <input type="text" className="form-control" id="inputAlias" value={this.state.alias}
              onChange={this.handleAliasChange} placeholder="Personalized Alias" disabled/>
          </div>
        </div>
        <div className="form-group">
            <div className="col-lg-10 col-lg-offset-2">
              <button type="button" className="btn btn-primary" onClick={this.sendInformationToServer}>Submit</button>
            </div>
        </div>
      </div>

    )
  }
});

module.exports.InputWrapper = InputWrapper;
module.exports.InputURL = InputURL;
module.exports.Panel = Panel;
