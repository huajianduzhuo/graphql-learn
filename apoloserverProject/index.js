const {ApolloServer, gql} = require('apollo-server')

const typeDefs = gql`
  type Query {
    hello: String,
    books: [Book]
  }
  type Mutation {
    createBook (title: String, author: String) : Book,
    deleteBook (id: String) : Boolean
  }
  type Book {
    id: String,
    title: String,
    author: String
  }
`

let books = Array(5).fill().map((v, i) => ({
  id: i + '',
  title: 'Title' + i,
  author: 'Author' + i
}))

const resolvers = {
  Query: {
    hello: () => 'hello, 白宇',
    books: () => books
  },
  Mutation: {
    createBook: (parent, args) => {
      let book = { ...args, id: +books[books.length - 1].id + 1 + '' }
      books.push(book)
      return book
    },
    deleteBook: (parent, args) => {
      let i = books.findIndex(book => book.id === args.id)
      if (i >= 0) {
        books.splice(i, 1)
        return true
      } else {
        return false
      }
    }
  }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({ url }) => {
  console.log(`🚀 server ready at ${url}`)
})