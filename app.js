const express = require('express')
const app = express()
const { ApolloServer, gql } = require('apollo-server-express')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')
let users = require('./data').users
let cars = require('./data').cars
const me = users[0]

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: Int!): User
    me: User

    cars: [Car]
    car(id: Int!): Car
  }

  type Mutation {
    makeUser(id: Int!, name: String!): User!
    removeUser(id: Int!): Boolean
    createCar(id: Int!, make: String!, model: String!, colour: String!): Car!
    removeCar(id: Int!): Boolean
  }

  type User {
    id: ID!
    name: String!
    car: [Car]
  }

  type Car {
    id: ID!,
    make: String!
    model: String!
    colour: String!
    owner: User!
  }
`
const resolvers = {
  Query: {
    users: () => users,
    user: (parent, { id }, context, info) => {
      console.log(parent)
      console.log(id)
      const user = users.filter(user => user.id === id)
      console.log(user)
      return user[0]
    },
    me: () => me,
    cars: () => cars,
    car: (parent, { id }) => {
      return cars.filter(car => car.id === id)[0]
    }
  },
  Mutation: {
    makeUser: (parent, { id, name }) => {
      const user = {
        id,
        name
      }
      users.push(user)
      return user
    },
    removeUser: (parent, { id }) => {
      const found = users.some(user => user.id === id)
      console.log('found: ' + found)
      users = users.filter(user => user.id !== id)
      return found
    },
    createCar: (parent, { id, make, model, colour }) => {
      const car = {
        id,
        make,
        model,
        colour
      }
      cars.push(car)
      return car
    },
    removeCar: (parent, { id }) => {
      const found = cars.some(car => car.id === id)
      console.log('found: ' + found)
      cars = cars.filter(car => car.id !== id)
      return found
    }
  },
  Car: {
    owner: (parent) => {
      console.log('Car custom resolver, parent')
      console.log(parent)
      return users[parent.ownedBy - 1]
    }
  },
  User: {
    car: (parent) => {
      const userHasCars = parent && parent.cars && parent.cars.length
      console.log('User car resolver')
      console.log(parent.cars)
      console.log(cars.filter(car => userHasCars && parent.cars.includes(car.id)))
      return cars.filter(car => userHasCars && parent.cars.includes(car.id))
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