const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const typeDefs = require('./schemas')
const resolvers = require('./resolvers')

const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

console.log('connecting to', MONGODB_URI)

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

const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)

    const schema = makeExecutableSchema({ typeDefs, resolvers })

    const subscriptionServer = SubscriptionServer.create(
        {
            schema,
            execute,
            subscribe,
        },
        {
            server: httpServer,
            path: '',
        }
    )

    const server = new ApolloServer({
        schema,
        context: async ({ req }) => {
            const auth = req ? req.headers.authorization : null
            if (auth && auth.toLowerCase().startsWith('bearer ')) {
                const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
                const currentUser = await User.findById(decodedToken.id)
                return { currentUser }
            }
        },
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close()
                        },
                    }
                },
            },
        ],
    })

    await server.start()

    server.applyMiddleware({ app, path: '/' })

    const PORT = process.env.PORT || 4000

    httpServer.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`)
    })
}

start()
