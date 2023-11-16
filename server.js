const express = require("express");
const app = express();

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    buildSchema,
} = require("graphql");
const { createHandler } = require("graphql-http/lib/use/express");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
        type TestData{
            text: String
            views: Int
        }

        type RootQuery {
            hello: TestData
        }

        type Post {
            _id: ID!
            title: String!
            content: String!
            imageUrl: String!
            creator: User!
            createdAt: String!
            updatedAt: String!
        }

        type User {
            _id: ID!
            name: String!
            email: String!
            password: String
            status: String!
            posts: [Post!]!
        }

        input UserInputData {
            email: String!
            name: String!
            password: String!
        }

        type RootMutation {
            createUser(userInput: UserInputData): User!
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `);

// The root provides a resolver function for each API endpoint
const rootValue = {
    hello: () => ({ text: "hello there", views: 1231 }),
    createUser: (args, req) => {
        return {
            _id: "124124141",
            name: args.userInput.name,
            email: args.userInput.email,
            password: args.userInput.password,
            status: "active",
            posts: [],
        };
    },
};

// app.use(express.json());

app.use(
    "/graphql",
    createHandler({
        schema,
        rootValue,
    })
);

app.listen(3000);
console.log("Running a GraphQL API server at http://localhost:3000/graphql");
