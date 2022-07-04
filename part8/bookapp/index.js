const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

const typeDefs = gql`
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Book {
        id: ID!
        title: String!
        author: Author!
        published: Int!
        genres: [String!]!
    }

    type Author {
        id: ID!
        name: String!
        born: Int
        bookCount: Int!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(title: String!, author: String!, published: Int!, genres: [String!]): Book
        editAuthor(name: String!, setBornTo: Int!): Author
        createUser(username: String!, favoriteGenre: String!): User
        login(username: String!, password: String!): Token
    }
`

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            let author = null
            if (args.author) {
                author = await Author.findOne({ name: args.author })
            }
            if (args.author && !author) {
                return []
            }

            let filter = {}
            if (args.author) {
                filter = { author: author.id }
            }
            if (args.genre) {
                filter = { genres: { $elemMatch: { $eq: args.genre } } }
            }
            if (args.author && args.genre) {
                filter = {
                    author: author.id,
                    genres: { $elemMatch: { $eq: args.genre } },
                }
            }
            return await Book.find(filter).populate('author')
        },
        allAuthors: async () => Author.find({}),
        me: async (root, args, context) => {
            return context.currentUser
        },
    },

    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                console.log('not authenticated')
                throw new AuthenticationError('not authenticated')
            }

            let author = await Author.findOne({ name: args.author })
            console.log(author)
            if (!author) {
                author = new Author({ name: args.author, id: uuidv4() })
                console.log(author)
                try {
                    await author.save()
                } catch (error) {
                    throw new UserInputError(error.message, { invalidArgs: args })
                }
            }

            let book = new Book({ ...args, author: author.id, id: uuidv4() })
            console.log(book)
            try {
                await book.save()
                const bookCount = await Book.find({
                    author: author.id,
                }).countDocuments()
                await Author.findOneAndUpdate({ name: author.name }, { bookCount: bookCount })
                book = await book.populate('author')
            } catch (error) {
                throw new UserInputError(error.message, { invalidArgs: args })
            }
            return book
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }
            try {
                const author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo })
                return author
            } catch (error) {
                throw new UserInputError(error.message, { invalidArgs: args })
            }
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
            try {
                await user.save()
                return user
            } catch (error) {
                throw new UserInputError(error.message, { invalidArgs: args })
            }
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (!user || args.password !== 'secret') {
                throw new UserInputError('wrong credentials')
            }
            const userForToken = { usename: user.username, id: user._id }
            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    },
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
