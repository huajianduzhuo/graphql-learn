const {ApolloServer, gql} = require('apollo-server')

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'hello, 白宇'
  }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({ url }) => {
  console.log(`🚀 server ready at ${url}`)
})