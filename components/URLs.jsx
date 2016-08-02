import React from 'react';
import {PageHeader, PageContent} from './PageContainer/Page.jsx';
import {Table} from './Table/TableURL.jsx';

let UrlsGeneric = React.createClass({

  render(){
    return (
      <section>
        <PageHeader>URL Shortener App</PageHeader>
        <PageContent>
          <Table url='/urls?short=true' prefix={this.props.route.short_prefix}
            table_headers={['#', 'Original URL', 'Short URL']}/>
          <Table url='/urls?alias=true' prefix={this.props.route.alias_prefix}
            table_headers={['#', 'Personalized Alias','Original URL']}/>
        </PageContent>
      </section>

    )
  }
});

export default UrlsGeneric;
