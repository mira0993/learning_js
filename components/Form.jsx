import React from 'react';
import {PageHeader, PageContent} from './PageContainer/Page.jsx';
import {InputWrapper, InputURL} from './TextInput/TextInput.jsx';

let UrlForm = React.createClass({
  render(){
    console.log(JSON.stringify(this.props.route));
    return (
      <section>
        <PageHeader>URL Form</PageHeader>
        <PageContent>
          <InputWrapper legend="New URL">
            <InputURL url="/urls" alias_prefix={this.props.route.prefix+'/a/'}
              short_prefix={this.props.route.prefix+'/s/'}/>
          </InputWrapper>
        </PageContent>
      </section>
    )
  }
});

export default UrlForm;
