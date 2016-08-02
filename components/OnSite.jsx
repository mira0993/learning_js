import React from 'react';
import {Panel} from './TextInput/TextInput.jsx';
import {PageHeader, PageContent} from './PageContainer/Page.jsx';

var backend =  ['Node.js', 'Express Framework', 'MongoDB/Mongoose'];
var frontend = ['React', 'Bootstrap theme', 'JQuery'];
var url_api_headers = ['Method', 'URL', 'Return Value', 'Description'];
var url_api = [
  {
    method: 'GET',
    url: '/urls',
    description: 'Retrieve all the short URLs and personalized URLs ',
    returnVal: 'JSON: list of all the URLs: {\'data:\'{\'short\': [], \'alias\': [], \'server\':<String>}'
  },
  {
    method: 'GET',
    url: '/urls?alias=true',
    description: 'Retrieve all personalized URLs.',
    returnVal: 'JSON: list of all the URLs: {\'data\':[],\'server\':<String>}'
  },
  {
    method: 'GET',
    url: '/urls?short=true',
    description: 'Retrieve all the short URLs.',
    returnVal: 'JSON: list of all the URLs:{\'data\':[],\'server\':<String>}'
  },
  {
    method: 'GET',
    url: '/urls/:id',
    description: 'Retrieve a single URL. If we pass \'?alias=true\' or '+
      '\'?short=true\', then it will look into the specific connection.',
    returnVal: 'JSON with specific URL information.'
  },
  {
    method: 'POST',
    url: '/urls',
    description: 'Create a new URL. If \'alias\' key is found in the body, then'+
      'add to personalized aliases collection. If not, then generate a unique'+
      'random url',
    returnVal: 'JSON with the created URL information.'

  }

]


var OnSite = React.createClass({
  render: function(){
    var index=0;
    var headers = url_api_headers.map(function(header){
      return <th key={'th_'+header.replace(' ', '_')}>{header}</th>
    });
    var backend_li = backend.map(function(item){
      index+=1;
      return <li key={'back'+index}>{item}</li>
    });
    var frontend_li = frontend.map(function(item){
      index+=1;
      return <li key={'front'+index}>{item}</li>
    });
    var api_rows = url_api.map(function(item){
      index+=1;
      return(
        <tr key={'url_api_'+index}>
          <td>{item['method']}</td>
          <td><pre>{item['url']}</pre></td>
          <td><pre>{item['returnVal']}</pre></td>
          <td>{item['description']}</td>
        </tr>
      )
    })

    return(
      <section>
        <PageHeader>OnSite Introduction</PageHeader>
        <PageContent>
          <Panel panel_type="info" panel_title="Tools">
            <h3>Back-end</h3>
            {backend_li}
            <h3>Front-end</h3>
            {frontend_li}
          </Panel>
          <Panel panel_type="info" panel_title="API">
              <table className="table table-striped table-hover ">
                <thead>
                  <tr>
                    {headers}
                  </tr>
                </thead>
                <tbody>
                  {api_rows}
                </tbody>
              </table>
          </Panel>
        </PageContent>
      </section>
    )
  }
})
export default OnSite;
