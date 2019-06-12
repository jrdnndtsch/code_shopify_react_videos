import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import App from './App';

// http link that will connect our app to our graphql
const httpLink = createHttpLink({
	uri: 'https://cool-clothes-101.myshopify.com/api/graphql'
});

// middleware to authenticate our request
const middlewareLink = setContext(() => ({
	headers: {
		'X-Shopify-Storefront-Access-Token': '496a0119887b4582386901948e406ceb'
	}
}));

// create apollo client
const client = new ApolloClient({
	link: middlewareLink.concat(httpLink), 
	cache: new InMemoryCache()
})

// render an app on the page using the apollo provider

ReactDOM.render(
	<ApolloProvider client={client}>
		<App/>
	</ApolloProvider>,
	document.getElementById('root')
);