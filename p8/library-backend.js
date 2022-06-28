require('dotenv').config()
const mongoose = require('mongoose')
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const Author = require('./models/author')
const Book = require('./models/book')
const author = require('./models/author')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })  
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
      name: String!,
      born: Int,
      id: ID!
      books: [Book]
      bookCount: Int
  }
  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    genres: [String],
    id: ID!
  }
  type Query {
      findAuthor(name: String!): Author
      bookCount: Int
      authorCount: Int
      allAuthors: [Author]
      allBooks: [Book]
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
      id: ID
    ): Book
    editAuthor(
      name: String!
      born: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
      findAuthor: (root, args) => Author.findOne({ name:args.name }),
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allAuthors: (root, args) =>  { return Author.find({}).populate('books') },
      allBooks: (root, args) => { return Book.find({}).populate('author') }
      /* FILTERS: allBooks: (root, args) => (args.author) ? books.filter(b => b.author === args.author) : (args.genre) ? books.filter(b => b.genres.includes(args.genre)) : books*/
  },
  Mutation: {
    addBook: async (root, args) => {

      const oldAuthor = await Author.findOne({name: args.author})

      if(!oldAuthor) {
        try {
          
          const author = new Author({ name: args.author )
          

          const book = new Book({
            title: args.title, 
            published: args.published, 
            author: author, 
            genres: args.genres
            })

            await book.save()
            return book
          }
          catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
      }
      else {
        try {
          const book = new Book({
            title: args.title, 
            published: args.published, 
            author: oldAuthor, 
            genres: args.genres
            })
            book.save()
            return book
          }
          catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.born
      try { 
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})