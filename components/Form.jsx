import React from 'react';
import {PageHeader, PageContent} from './PageContainer/Page.jsx';
import {InputWrapper, InputURL} from './TextInput/TextInput.jsx';

let UrlForm = React.createClass({
  render(){
    return (
      <section>
        <PageHeader>URL Form</PageHeader>
        <PageContent>
          <InputWrapper legend="New URL">
            <InputURL url="/urls" alias_prefix={this.props.route.alias_prefix}
              short_prefix={this.props.route.short_prefix}/>
          </InputWrapper>
        </PageContent>
      </section>
    )
  }
});

export default UrlForm;
