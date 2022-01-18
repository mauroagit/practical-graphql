const express = require('express')
const app = express()
const { ApolloServer, gql } = require('apollo-server-express')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')

const typeDefs = gql`
  type Query {
    me: User
  }

  type User {
    name: String!
  }
`
const resolvers = {
  Query: {
    me: () => {
      return {
        name: 'Mauro'
      }
    }
  }
}

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ]
  })
  await server.start()
  server.applyMiddleware({ app })

  app.listen(3000, () => console.info('Apollo GraphQL server is running on port 3000'))
  // http://localhost:3000/graphql
}

(async () => {
  startApolloServer(typeDefs, resolvers)
})()

/*

Cris
const express = require('express')
const { ApolloServer} = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const http = require('http')

const models = require('./models')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

async function startApolloServer(typeDefs, resolvers) {
    const app = express()
    const httpServer = http.createServer(app)
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: {
        models
      },
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    })

    await server.start();
    server.applyMiddleware({ app });
    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve))
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}


(async () => {
    await startApolloServer(typeDefs, resolvers)
})()



package.json
{
  "name": "gl",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "dependencies": {
    "apollo-server": "^3.6.1",
    "apollo-server-express": "3.6.1",
    "express": "^4.17.2",
    "graphql": "^16.2.0"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


*/