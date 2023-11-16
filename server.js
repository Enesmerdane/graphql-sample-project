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

        type Query {
            hello: TestData
        }
    `);

// The root provides a resolver function for each API endpoint
const rootValue = {
    hello: () => ({text: "hello there", views: 1231}),
};

app.use(
    "/graphql",
    createHandler({
        schema,
        rootValue,
    })
);

app.listen(3000);
console.log("Running a GraphQL API server at http://localhost:3000/graphql");
