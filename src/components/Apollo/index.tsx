import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'

export const client = new ApolloClient({
  fetch,
  uri: 'https://dh.jesses.dev/api/',
})

export default client
