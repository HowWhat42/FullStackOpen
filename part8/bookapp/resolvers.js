const { UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const pubsub = new PubSub()

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
                filter = { genres: { $in: args.genre } }
            }
            if (args.author && args.genre) {
                filter = {
                    author: author.id,
                    genres: { $in: args.genre },
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
                throw new AuthenticationError('not authenticated')
            }

            let author = await Author.findOne({ name: args.author })
            if (!author) {
                author = new Author({ name: args.author, id: uuidv4() })
                try {
                    await author.save()
                } catch (error) {
                    throw new UserInputError(error.message, { invalidArgs: args })
                }
            }

            let book = new Book({ ...args, author: author.id, id: uuidv4() })
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
            pubsub.publish('BOOK_ADDED', { bookAdded: book })
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
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
        },
    },
}

module.exports = resolvers
