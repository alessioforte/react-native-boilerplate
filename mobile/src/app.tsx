import * as React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './containers/App';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  // headers: {
  //   authorization: localStorage.getItem('token'),
  // },
  cache: new InMemoryCache(),
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

AppRegistry.registerComponent('MyApplication', () => Root);

export default Root;
